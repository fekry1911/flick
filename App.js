import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Logins from "./Screens/auth/Login/Logins";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigation/stack";
import { ToastProvider } from "react-native-toast-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavProvider from "./context/FavContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavProvider>
        <ToastProvider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </ToastProvider>
      </FavProvider>
    </QueryClientProvider>
  );
}
