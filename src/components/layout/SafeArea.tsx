import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

const SafeArea: React.FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

export default SafeArea;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
