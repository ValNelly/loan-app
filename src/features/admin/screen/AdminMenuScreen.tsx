import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { menuItems } from "../utils";
import { MainRouteName } from "../../../navigation/route";
const itemWidth = Dimensions.get("window").width / 2 - 5;

const AdminMenuScreen = ({ navigation }: any) => {
  return (
    <View>
      <FlatList
        data={menuItems}
        numColumns={2}
        keyExtractor={({ id }) => `${id}`}
        contentContainerStyle={styles.itemsContainer}
        renderItem={({ item, index }) => {
          const { icon, name, route } = item;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(MainRouteName.ADMIN_NAVIGATION, {
                  screen: route,
                });
              }}
            >
              <View style={[styles.item, { backgroundColor: "white" }]}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={icon}
                />
                <Text variant="titleMedium">{name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AdminMenuScreen;

const styles = StyleSheet.create({
  image: {
    width: itemWidth,
    height: 80,
  },
  item: {
    width: itemWidth - 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemsContainer: {
    padding: 10,
    alignItems: "center",
  },
});
