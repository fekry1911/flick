import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQueries } from "@tanstack/react-query";
import { FavContext } from "../../context/FavContext";
import { getMovieById } from "../../apis/handleApis";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import routers from "../../utils/routers";
import AntDesign from "@expo/vector-icons/AntDesign";
import Loading from "../../components/animations/Loading";
import NoData from "../../components/animations/NoData";

export default function FavScreen() {
  const { allFav, setAllFav } = useContext(FavContext);
  const navigation = useNavigation();

  const results = useQueries({
    queries: allFav.map((id) => ({
      queryKey: ["favMovie", id],
      queryFn: () => getMovieById(id),
      enabled: !!id,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const movies = results
    .map((r) => r.data)
    .filter((movie) => movie !== undefined);

  const removeFav = (id) => {
    setAllFav(allFav.filter((favId) => favId !== id));
  };

  if (isLoading) {
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

  if (movies.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1F1F29",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NoData text={"No Data In Favorites"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1F1F29", paddingVertical: 10 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate(routers.details, { id: item.id })
            }
            style={{
              width: "48%",
              marginBottom: 15,
              backgroundColor: "#2A2A35",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
              style={{ width: "100%", height: 220 }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                  width: "80%",
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Pressable onPress={() => removeFav(item.id)}>
                <AntDesign name="heart" size={20} color="red" />
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
