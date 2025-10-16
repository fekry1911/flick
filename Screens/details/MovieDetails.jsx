import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import SvgComponent from "../../components/shared/Star";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getMovieActorsById, getMovieById } from "../../apis/handleApis";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import { ActivityIndicator } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FavContext } from "../../context/FavContext";
import Loading from "../../components/animations/Loading";

export default function MovieDetails() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const { allFav, setAllFav } = useContext(FavContext);

  const [fav, setFav] = useState(false);
  const [more, setMore] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Movie Details 🎬",
      headerStyle: {
        backgroundColor: "#1F1F29",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const { data: movie, isLoading: loadingMovie } = useQuery({
    queryKey: ["MovieDetails", id],
    queryFn: () => getMovieById(id),
  });

  const { data: actorsDetails, isLoading: loadingActors } = useQuery({
    queryKey: ["ActorsDetails", id],
    queryFn: () => getMovieActorsById(id),
  });

  useEffect(() => {
    if (movie?.id) setFav(allFav.includes(movie.id));
  }, [allFav, movie?.id]);

  const toggleFav = (id) => {
    if (allFav.includes(id)) {
      setAllFav(allFav.filter((favId) => favId !== id));
    } else {
      setAllFav([...allFav, id]);
    }
  };

  if (loadingMovie) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1F1F29",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </View>
    );
  }

  if (!movie) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1F1F29",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
        }}
      >
        <Text style={{ color: "white" }}>No Movie Found 😢</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#1F1F29" }}
    >
      <Image
        resizeMode="stretch"
        style={{ width: "100%", height: 400 }}
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.tag}>
            <Text style={{ color: "white" }}>{movie.adult ? "+18" : "PG"}</Text>
          </View>

          {movie.genres?.length > 0 && (
            <View style={styles.tag}>
              <Text style={{ color: "white" }}>{movie.genres[0].name}</Text>
            </View>
          )}

          <View
            style={[styles.tag, { flexDirection: "row", alignItems: "center" }]}
          >
            <SvgComponent />
            <Text style={{ color: "white", marginLeft: 5 }}>
              {movie.vote_average?.toFixed(1)}
            </Text>
          </View>
        </View>

        <Pressable onPress={() => toggleFav(movie.id)}>
          {fav ? (
            <AntDesign name="heart" size={26} color="red" />
          ) : (
            <Feather name="heart" size={26} color="white" />
          )}
        </Pressable>
      </View>

      <Text
        style={{
          paddingHorizontal: 10,
          fontSize: 25,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {movie.title}
      </Text>

      <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
        <Text
          style={{ fontSize: 15, color: "white" }}
          numberOfLines={more ? undefined : 3}
        >
          {movie.overview}
        </Text>

        <Pressable onPress={() => setMore(!more)}>
          <Text
            style={{
              fontSize: 15,
              color: "red",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            {more ? "Show Less" : "Show More"}
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          paddingHorizontal: 10,
          fontSize: 22,
          color: "white",
          marginVertical: 10,
        }}
      >
        Actors
      </Text>

      {loadingActors ? (
        <Loading />
      ) : (
        <FlatList
          data={actorsDetails?.cast || []}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => <ActorCard actor={item} />}
        />
      )}
    </ScrollView>
  );
}

function ActorCard({ actor }) {
  return (
    <View style={{ marginRight: 15, alignItems: "center", marginBottom: 15 }}>
      <Image
        source={{
          uri: actor.profile_path
            ? `${IMAGE_BASE_URL}${actor.profile_path}`
            : "https://via.placeholder.com/100x100?text=?",
        }}
        style={{ borderRadius: 10, width: 108, height: 108 }}
      />
      <Text
        style={{
          marginTop: 8,
          color: "white",
          width: 100,
          textAlign: "center",
        }}
        numberOfLines={2}
      >
        {actor.name}
      </Text>
    </View>
  );
}

const styles = {
  tag: {
    backgroundColor: "#312F35",
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};
