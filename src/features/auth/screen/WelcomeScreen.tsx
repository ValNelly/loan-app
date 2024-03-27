import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../../components/display/Logo";
import SafeArea from "../../../components/layout/SafeArea";
import { Button } from "react-native-paper";

const WelcomeScreen = () => {
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Logo size={200} />
        <View style={{ flex: 1 }} />
        <View style={{ width: "100%", padding: 10 }}>
          <Button mode="contained">Get Started</Button>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </SafeArea>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
