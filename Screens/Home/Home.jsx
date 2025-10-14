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
} from "react-native";
import React from "react";
import { getPopular } from "../../apis/handleApis";
import { useQuery } from "@tanstack/react-query";
import PopularCompo from "../../components/shared/PopularCompo";
import { CarouselMomentum } from "react-native-momentum-carousel";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const window = Dimensions.get("window");

export default function Home() {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["Movies"],
    queryFn: getPopular,
  });

  const movies = data || [];

  return (
    <View style={styles.container}>
      <View style={styles.mmain}>
        <TextInput
          style={styles.input}
          placeholder="Search."
          placeholderTextColor="#999"
        />
      </View>

      {isLoading && !data ? (
        <ActivityIndicator
          style={{ margin: 30 }}
          size="large"
          color="#ffffffff"
        />
      ) : (
        <CarouselMomentum
          data={data}
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
          flexDirection: "row",
          marginHorizontal: "auto",
          width: "95%",
          marginVertical: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Top Rated</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
