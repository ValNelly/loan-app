import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  size?: number;
}

const Logo: React.FC<Props> = ({ size = 100 }) => {
  return (
    <View>
      <Image
        style={{ width: size, height: size }}
        source={require("../../../assets/logo.png")}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
