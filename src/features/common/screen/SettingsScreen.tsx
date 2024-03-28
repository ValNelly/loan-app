import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeArea from "../../../components/layout/SafeArea";
import { Avatar, Card, List } from "react-native-paper";
import UserContext from "../../../lib/context/user";
import { User } from "../../../lib/entities";
import { viewProfile } from "../../auth/api";

const SettingsScreen = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    (async () => {
      const response = await viewProfile(userContext!.token);
      if (response.ok) setUser(response.data as User);
    })();
  });
  return (
    <SafeArea>
      {user && (
        <Card.Title
          style={{ backgroundColor: "white" }}
          title={user.name ?? user.username}
          subtitle={user.email}
          left={(props) => <Avatar.Icon {...props} icon={"account"} />}
        />
      )}
      <List.Item
        style={{ backgroundColor: "white", marginTop: 10 }}
        title="Logout"
        left={(props) => <List.Icon {...props} icon={"logout"} />}
        onPress={() => {
          Alert.alert("Logout", "Are you sure to log out?", [
            { text: "Logout", onPress: () => userContext?.clearToken?.(true) },
            { text: "Cancel" },
          ]);
        }}
      />
    </SafeArea>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
