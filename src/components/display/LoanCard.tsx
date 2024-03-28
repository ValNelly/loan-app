import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
interface Props {
  image: any;
  type: string;
  amount: string;
}
const LoanCard: React.FC<Props> = ({ image, type, amount }) => {
  return (
    <View
      style={{
        margin: 10,
        overflow: "hidden",
        flexDirection: "row",
        borderRadius: 20,
        height: 100,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}
      >
        <Text variant="titleLarge">Upto</Text>
        <Text variant="headlineMedium">{amount}</Text>
        <Text variant="labelMedium">{type}</Text>
      </View>
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: "30%",
          height: "100%",
          backgroundColor: "black",
        }}
      />
    </View>
  );
};

export default LoanCard;

const styles = StyleSheet.create({});
