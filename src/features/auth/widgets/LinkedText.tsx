import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface Props {
  onPress?: () => void;
  linkedText: string;
  unlinked: string;
}
const LinkedText: React.FC<Props> = ({ onPress, linkedText, unlinked }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.unlinked}>{unlinked}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.linked}>{linkedText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkedText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 20,
    paddingVertical: 10,
  },
  linked: {
    color: "indigo",
  },
  unlinked: {},
});
