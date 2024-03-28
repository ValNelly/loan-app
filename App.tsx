import { StatusBar } from "expo-status-bar";
import { AppState, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import { UserContextProvider } from "./src/lib/context/user";
import { useState } from "react";
import useSecureStore from "./src/lib/hooks/useSecureStore";

// import Screen from './Screen';
{
  /* <StatusBar style="auto" /> */
}

export default function App() {
  const [token, setToken, clearToken] = useSecureStore(
    "token",
    null
  );
  const [user, setUser] = useState();
  return (
    <UserContextProvider
      value={{ user, setUser: setUser as any, token, setToken, clearToken }}
    >
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </UserContextProvider>
  );
}
