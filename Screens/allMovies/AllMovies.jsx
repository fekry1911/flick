import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";
import MovieCard from "../../components/shared/MovieCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/animations/Loading";

export default function AllMovies({ route }) {
  const { method, title } = route.params;
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["GetAllMovies", page],
    queryFn: () => method(page),
    refetchOnMount: "always",
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: "#1F1F29",
      },
      headerTintColor: "#fff",
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFetching ? (
        <Loading />
      ) : (
        <View
          style={{
            width: "95%",
            marginVertical: 15,
            marginHorizontal: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            disabled={page === 1}
            style={{
              opacity: page === 1 ? 0.5 : 1,

              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setPage((prev) => prev - 1)}
          >
            <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
            <Text
              style={{
                color: "white",
              }}
            >
              Pevious
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontSize: 17,
            }}
          >
            page {page}
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => setPage((prev) => prev + 1)}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Next
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        data={data}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F29",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F1F29",
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});
