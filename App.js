import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Logins from "./Screens/auth/Login/Logins";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigation/stack";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F29",
  },
  text: {
    color: "white",
  },
});
