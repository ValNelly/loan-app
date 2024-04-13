import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SafeArea from "../../../components/layout/SafeArea";
import { Avatar, Card, List } from "react-native-paper";
import UserContext from "../../../lib/context/user";
import { MainRouteName } from "../../../navigation/route";
import { AdminRoutNames } from "../../admin/navigation/route";
import { viewProfile } from "../../auth/api";
import { useFocusEffect } from "@react-navigation/native";

const SettingsScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);
  const handleFetch = async () => {
    const response = await viewProfile(userContext!.token);
    if (response.ok) userContext!.setUser(response.data as any);
    else console.log(__filename, response.data);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <SafeArea>
      {userContext?.user && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(MainRouteName.ADMIN_NAVIGATION, {
              screen: AdminRoutNames.USERS_FORM_SCREEN,
              params: { user: userContext.user, profile: true },
            });
          }}
        >
          <Card.Title
            style={{ backgroundColor: "white" }}
            title={userContext.user.name ?? userContext.user.username}
            subtitle={userContext.user.email}
            left={(props) => <Avatar.Icon {...props} icon={"account"} />}
          />
        </TouchableOpacity>
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
