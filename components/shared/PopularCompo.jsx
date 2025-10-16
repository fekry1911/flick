import React from "react";
import { View, Text, ImageBackground, Image, Pressable } from "react-native";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import SvgComponent from "./Star";
import play from "../../assets/images/play.png";
import { useNavigation } from "@react-navigation/native";
import routers from "../../utils/routers";

function PopularCompoComponent({ movie }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(routers.details, { id: movie.id })}
    >
      <ImageBackground
        style={{
          height: 200,
          marginVertical: 20,
          borderRadius: 20,
          overflow: "hidden",
          marginHorizontal: "auto",
          padding: 0,
        }}
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            width: "90%",
            marginBottom: "auto",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ width: "60%" }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginBottom: 20,
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {movie.original_title}
            </Text>

            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ color: "white", fontSize: 12 }}
            >
              {movie.overview}
            </Text>
          </View>

          <View
            style={{
              width: "35%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", marginRight: 5 }}>
              {movie.vote_average.toFixed(1)}
            </Text>
            <SvgComponent />
          </View>
        </View>

        <View
          style={{
            padding: 10,
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ color: "white" }}>{movie.release_date}</Text>
          <Image source={play} style={{ width: 30, height: 30 }} />
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export default React.memo(PopularCompoComponent);
