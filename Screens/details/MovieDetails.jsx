import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import SvgComponent from "../../components/shared/Star";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getMovieActorsById, getMovieById } from "../../apis/handleApis";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import { ActivityIndicator } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function MovieDetails() {
  const [fav, setfav] = useState(false);
  const route = useRoute();
  const { id } = route.params;
  const [more, setMore] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Movie Details 🎬",
      headerStyle: {
        backgroundColor: "#1F1F29",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);
  const {
    data: movieDetails,
    isLoading: loadingMovie,
    error: errorMovie,
  } = useQuery({
    queryKey: ["MovieDetails", id],
    queryFn: () => getMovieById(id),
  });

  const {
    data: actorsDetails,
    isLoading: loadingActors,
    error: errorActors,
  } = useQuery({
    queryKey: ["ActorsDetails", id],
    queryFn: () => getMovieActorsById(id),
  });

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
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const movie = movieDetails;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1F1F29" }}>
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
        {fav ? (
          <Pressable onPress={() => setfav(!fav)}>
            {" "}
            <AntDesign name="heart" size={24} color="red" />
          </Pressable>
        ) : (
          <Pressable onPress={() => setfav(!fav)}>
            {" "}
            <Feather name="heart" size={24} color="white" />
          </Pressable>
        )}
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
        <ActivityIndicator color="white" />
      ) : (
        <FlatList
          data={actorsDetails.cast}
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
    <View style={{ marginRight: 15, alignItems: "center" }}>
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
