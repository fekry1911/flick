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

export default function Home() {
  let navigation = useNavigation();
  let [num, setnum] = useState(1);

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

  return (
    <ScrollView style={{ backgroundColor: "#1F1F29" }}>
      <View style={styles.container}>
        <View style={styles.mmain}>
          <TextInput
            style={styles.input}
            placeholder="Search."
            placeholderTextColor="#999"
          />
        </View>

        {loadingPopular && !popular ? (
          <ActivityIndicator
            style={{ margin: 30 }}
            size="large"
            color="#ffffffff"
          />
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
          <ActivityIndicator
            style={{ margin: 30 }}
            size="large"
            color="#ffffffff"
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
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
          <ActivityIndicator
            style={{ margin: 30 }}
            size="large"
            color="#ffffffff"
          />
        ) : (
          <FlatList
            data={upComing}
            showsVerticalScrollIndicator={false}
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
          </TouchableOpacity>{" "}
        </View>
        {loadingNowwPlaying && !nowPlaying ? (
          <ActivityIndicator
            style={{ margin: 30 }}
            size="large"
            color="#ffffffff"
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={nowPlaying}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
            horizontal={true}
          />
        )}
      </View>
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
});
