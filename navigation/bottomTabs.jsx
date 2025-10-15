import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import routers from "../utils/routers";
import { getData } from "../utils/local";
import Home from "../Screens/Home/Home";
import FavScreen from "../Screens/fav/FavMovies";
import ProfileScreen from "../Screens/profile/profile";
import { FavContext } from "../context/FavContext";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  let { allFav } = useContext(FavContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await getData("name");
      if (name) setUserName(name);
    };
    fetchUserName();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1F1F29" },
        headerTitleStyle: { color: "white" },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#1F1F29",
          borderTopWidth: 0,
          elevation: 0,
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#aaa",
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        headerBackVisible: false,
      }}
    >
      <Tab.Screen
        name={routers.home}
        component={Home}
        options={{
          headerTitle: `Welcome ${userName || ""}`,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={27} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={routers.fav}
        component={FavScreen}
        options={{
          headerTitle: "Favorite Movies",
          tabBarLabel: "Favorite",
          tabBarBadge: allFav.length,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={27} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={routers.profile}
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={27} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
