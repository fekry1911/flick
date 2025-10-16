import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
  Pressable,
  Image,
  ActivityIndicator,
  FlatListComponent,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  getGenres,
  getMoviesGenres,
  getNowPlaying,
  getPopular,
  gettopRated,
  getUpComing,
} from "../../apis/handleApis";
import { useQuery } from "@tanstack/react-query";
import PopularCompo from "../../components/shared/PopularCompo";
import { CarouselMomentum } from "react-native-momentum-carousel";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Rating } from "react-native-ratings";
import MovieCard from "../../components/shared/MovieCard";
import { useNavigation } from "@react-navigation/native";
import routers from "../../utils/routers";
import Loading from "../../components/animations/Loading";

export default function Home() {
  let navigation = useNavigation();
  const [cateId, setcateID] = useState(28);
  const { data: popular, isLoading: loadingPopular } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => getPopular(1),
  });

  const { data: topRated, isLoading: loadingTopRated } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => gettopRated(1),
  });
  const { data: upComing, isLoading: loadingupComing } = useQuery({
    queryKey: ["upComingMovies"],
    queryFn: () => getUpComing(1),
  });
  const { data: nowPlaying, isLoading: loadingNowwPlaying } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: () => getNowPlaying(1),
  });
  const { data: geners, isLoading: loadingGeners } = useQuery({
    queryKey: ["GetGenres"],
    queryFn: getGenres,
  });
  const { data: genersMovies, isLoading: loadingGenersMovies } = useQuery({
    queryKey: ["GetGenresMovies", cateId],
    queryFn: () => getMoviesGenres(cateId),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#1F1F29" }}
    >
      <View style={styles.container}>
        <View style={styles.mmain}>
          <TextInput
            showSoftInputOnFocus={false}
            onFocus={() => navigation.navigate(routers.search)}
            style={styles.input}
            placeholder="Search."
            placeholderTextColor="#999"
          />
        </View>

        {loadingPopular && !popular ? (
          <Loading />
        ) : (
          <CarouselMomentum
            loop
            data={popular}
            sliderWidth={600}
            itemWidth={400}
            showPagination={false}
            autoPlay={true}
            onSnap={() => {}}
            renderItem={({ item }) => <PopularCompo movie={item} />}
          />
        )}

        <View
          style={{
            width: "95%",
            marginHorizontal: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "white" }}>Top Rated</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routers.movies, {
                method: gettopRated,
                title: "Top Rated",
              })
            }
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {loadingTopRated && !topRated ? (
          <Loading />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={topRated}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
            horizontal={true}
          />
        )}
        <View
          style={{
            width: "95%",
            marginHorizontal: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "white" }}>Up Coming</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routers.movies, {
                method: getUpComing,
                title: "Up Coming",
              })
            }
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {loadingupComing && !upComing ? (
          <Loading />
        ) : (
          <FlatList
            data={upComing}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
            horizontal={true}
          />
        )}
        <View
          style={{
            width: "95%",
            marginHorizontal: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "white" }}>Now Playing</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routers.movies, {
                method: getNowPlaying,
                title: "Now Playing",
              })
            }
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {loadingNowwPlaying && !nowPlaying ? (
          <Loading />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={nowPlaying}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
            horizontal={true}
          />
        )}
      </View>
      <View
        style={{
          width: "95%",
          marginHorizontal: "auto",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white" }}>Chosse Your Category</Text>
      </View>

      {loadingGeners && !geners ? (
        <Loading />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          data={geners}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor:
                  cateId == item.id ? "rgba(105, 105, 221, 1)" : "#2A2A3B",
                marginRight: 10,
              }}
              onPress={() => {
                setcateID(item.id);
              }}
            >
              <Text style={{ color: "white", fontSize: 14, fontWeight: "500" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          horizontal={true}
        />
      )}
      {loadingGenersMovies && !genersMovies ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loading />
        </View>
      ) : (
        <FlatList
          data={genersMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginTop: 20,
            paddingBottom: 30,
            justifyContent: "space-between",
            alignItems: "center",
            rowGap: 20,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    flex: 1,
    backgroundColor: "#1F1F29",
    alignItems: "center",
  },
  mmain: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  input: {
    borderColor: "#999",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});
