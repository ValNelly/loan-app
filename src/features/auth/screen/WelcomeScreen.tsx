import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../../components/display/Logo";
import SafeArea from "../../../components/layout/SafeArea";
import { Button } from "react-native-paper";
import { AuthRoutNames } from "../navigation";

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Logo size={200} />
        <View style={{ flex: 1 }} />
        <View style={{ width: "100%", padding: 10 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate(AuthRoutNames.LOGIN_SCREEN)}
          >
            Get Started
          </Button>
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
