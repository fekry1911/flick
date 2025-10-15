import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routers from "../utils/routers";
import Logins from "../Screens/auth/Login/Logins";
import Register from "../Screens/auth/register";
import Home from "../Screens/Home/Home";
import { getData } from "../utils/local";
import { ActivityIndicator, View } from "react-native";
import SplashScreen from "../Screens/splashScreen/SplashScreen";
import MovieDetails from "../Screens/details/MovieDetails";
import AllMovies from "../Screens/allMovies/AllMovies";

const Stack = createNativeStackNavigator();

function MyStack() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await getData("name");

      if (name) setUserName(name);
    };

    fetchUserName();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routers.splash}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routers.login}
        component={Logins}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={routers.register}
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={routers.home}
        component={Home}
        options={{
          headerBackVisible: false,
          headerStyle: { backgroundColor: "#1F1F29" },
          headerTitleStyle: { color: "white" },
          headerTitle: `Welcome ${userName || ""}`,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={routers.details}
        component={MovieDetails}
        options={{
          headerBackVisible: true,
          headerBackTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#1F1F29" },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={routers.movies}
        component={AllMovies}
        options={{
          headerBackVisible: true,
          headerBackTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#1F1F29" },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
