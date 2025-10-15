import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import noData from "../../assets/animations/NoData.json";
import loading from "../../assets/animations/loading.json";
import empty from "../../assets/animations/Empty.json";

export default function NoData({ text }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={empty}
        autoPlay
        loop={true}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ color: "white" }}>{text}</Text>
    </View>
  );
}
