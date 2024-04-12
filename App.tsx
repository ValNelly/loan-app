import { StatusBar } from "expo-status-bar";
import { AppState, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import { UserContextProvider } from "./src/lib/context/user";
import { useEffect, useState } from "react";
import useSecureStore from "./src/lib/hooks/useSecureStore";
import { viewProfile } from "./src/features/auth/api";

// import Screen from './Screen';
{
  /* <StatusBar style="auto" /> */
}

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("token", null);

  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      (async () => {
        const response = await viewProfile(token);
        if (response.ok) setUser(response.data as any);
        else console.log(__filename, response.data);
      })();
    }
  }, [token]);
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
