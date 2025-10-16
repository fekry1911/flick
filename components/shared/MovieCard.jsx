import React, { useContext, useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import { IMAGE_BASE_URL } from "../../utils/Api_keys";
import { useNavigation } from "@react-navigation/native";
import routers from "../../utils/routers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
import { FavContext } from "../../context/FavContext";

function MovieCardComponent({ movie }) {
  const navigation = useNavigation();
  const { allFav, setAllFav } = useContext(FavContext);

  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(allFav.includes(movie.id));
  }, [allFav, movie.id]);

  const toggleFav = (id) => {
    if (allFav.includes(id)) {
      setAllFav(allFav.filter((favId) => favId !== id));
    } else {
      setAllFav([...allFav, id]);
    }
  };

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
        <ImageBackground
          source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
          style={{
            width: 150,
            height: 217,
            borderRadius: 10,
            marginBottom: 10,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: 7,
          }}
          imageStyle={{ borderRadius: 10 }}
        >
          <Pressable onPress={() => toggleFav(movie.id)}>
            {fav ? (
              <AntDesign name="heart" size={24} color="red" />
            ) : (
              <Feather name="heart" size={24} color="white" />
            )}
          </Pressable>
        </ImageBackground>

        <Text
          style={{ color: "white", marginBottom: 10, fontSize: 15 }}
          numberOfLines={1}
        >
          {movie.original_title}
        </Text>

        <Rating
          readonly
          startingValue={movie.vote_average / 2}
          type="star"
          ratingCount={5}
          imageSize={25}
          tintColor="#1F1F29"
        />
      </View>
    </Pressable>
  );
}

export default React.memo(MovieCardComponent);
