import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import WelcomeScreen from "./src/features/auth/screen/WelcomeScreen";
import LoginScreen from "./src/features/auth/screen/LoginScreen";
import RegisterScreen from "./src/features/auth/screen/RegisterScreen";

// import Screen from './Screen';

export default function App() {
  return <RegisterScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
