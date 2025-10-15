import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import loading from "../../assets/animations/loading.json";

export default function Loading() {
  return (
    <LottieView
      source={loading}
      autoPlay
      loop={true}
      style={{ width: "50", height: "50" }}
    />
  );
}
