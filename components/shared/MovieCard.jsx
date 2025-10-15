import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import { useNavigation } from "@react-navigation/native";
import routers from "../../utils/routers";

export default function MovieCard({ movie }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(routers.details, { id: movie.id })}
    >
      <View
        style={{
          alignItems: "center",
          width: 150,
          marginHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <Image
          source={{
            uri: `${IMAGE_BASE_URL}${movie.poster_path}`,
          }}
          style={{
            width: 150,
            height: 217,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <Text
          style={{ color: "white", marginBottom: 10, fontSize: 15 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {movie.original_title}
        </Text>
        <Rating
          readonly
          startingValue={movie.vote_average / 2}
          type="star"
          ratingCount={5}
          imageSize={25}
          onFinishRating={(rate) => {
            console.error(rate);
          }}
          tintColor="#1F1F29"
        />
      </View>
    </Pressable>
  );
}
