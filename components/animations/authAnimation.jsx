import React from "react";
import LottieView from "lottie-react-native";

export default function AnimationAuth({ animation, loop }) {
  return (
    <LottieView
      source={animation}
      autoPlay
      loop={loop}
      style={{ width: "300", height: "300" }}
    />
  );
}
