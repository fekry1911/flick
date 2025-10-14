import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Image } from "react-native";
import logo from "../../assets/logo/logo.png";
import { getData } from "../../utils/local";
import { useNavigation } from "@react-navigation/native";
import routers from "../../utils/routers";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let navigation = useNavigation();
  useEffect(() => {
    const startAnimation = async () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const token = await getData("token");

      if (token) {
        navigation.replace(routers.home);
      } else {
        navigation.replace(routers.login);
      }
    };

    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[
          styles.image,
          {
            opacity: fadeAnim,
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text
        oba
        style={[
          styles.text,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        Welcome To Flick
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F29",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    fontSize: 30,
    color: "white",
  },
});
