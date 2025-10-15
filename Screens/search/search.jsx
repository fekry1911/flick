import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { getMovieByName } from "../../apis/handleApis";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NoData from "../../components/animations/NoData";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import { useNavigation } from "@react-navigation/native";
import routers from "../../utils/routers";

export default function Search() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["GetSearch", search],
    queryFn: () => getMovieByName(search),
    enabled: !!search,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#1F1F29" }}>
      <TextInput
        textColor="white"
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!data || data.length === 0 ? (
          <NoData text={"Search For Show Movies"} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={{
                  width: "95%",
                  height: 200,
                  marginVertical: 20,
                  borderRadius: 12,
                  overflow: "hidden",
                  alignSelf: "center",
                  backgroundColor: "#000",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
                resizeMode="contain"
              >
                <View
                  style={{
                    width: "95%",
                    height: 65,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                    numberOfLines={1}
                  >
                    {item.title || item.original_title}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routers.details, { id: item.id })
                    }
                  >
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
    marginHorizontal: "auto",
    backgroundColor: "#2A2A35",
    color: "white",
    fontSize: 16,
    borderRadius: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#3D3D4F",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
