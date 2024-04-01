import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Checkbox,
  FAB,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import { Feed } from "../../../lib/entities";
import { useFormikContext } from "formik";

interface Props {
  feeds?: Feed[];
}

const FeedsInput: React.FC<Props> = ({ feeds = [] }) => {
  const [showItems, setShowItems] = useState<boolean>(false);
  const toggleShowItems = () => setShowItems(!showItems);
  const { values, setFieldValue } = useFormikContext();
  const name = "feeds";
  const value = (values as any)[name] as { feed: string; quantity: number }[];

  const handleCheckboxPress = (id: string) => {
    const itemIndex = value.findIndex((v) => v.feed === id);
    if (itemIndex !== -1) {
      const valuesCopy = [...value];
      valuesCopy.splice(itemIndex, 1);
      setFieldValue(name, valuesCopy);
    } else {
      setFieldValue(name, [...value, { feed: id, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id: string, increment: boolean) => {
    const itemIndex = value.findIndex((v) => v.feed === id);
    if (itemIndex !== -1) {
      const valuesCopy = [...value];
      valuesCopy[itemIndex].quantity += increment ? 1 : -1;
      setFieldValue(name, valuesCopy);
    }
  };

  const getFeed = (id: string) => feeds.find((f) => f.id === id);

  return (
    <>
      <TouchableOpacity onPress={toggleShowItems}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <IconButton icon="food-variant" />
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            {value.length > 0 ? (
              <FlatList
                horizontal
                data={value}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginLeft: 10,
                      backgroundColor: "#BBBBA7",
                      padding: 8,
                      borderRadius: 10,
                    }}
                  >
                    <Text>{`${getFeed(item.feed)?.name} (${
                      item.quantity
                    } Kgs)`}</Text>
                  </View>
                )}
              />
            ) : (
              <Text>Feeds</Text>
            )}
          </View>
          <IconButton icon="chevron-down" />
        </View>
      </TouchableOpacity>
      {showItems && (
        <Modal animationType="slide" onRequestClose={toggleShowItems}>
          <View style={styles.itemsContainer}>
            <Text style={{ textAlign: "center", marginVertical: 20 }}>
              Feeds
            </Text>
            <FlatList
              data={feeds}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <List.Item
                  left={(props) => (
                    <Checkbox
                      status={
                        value.findIndex((v) => v.feed === item.id) !== -1
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => handleCheckboxPress(item.id)}
                      {...props}
                    />
                  )}
                  title={item.name}
                  right={(props) => (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <IconButton
                        icon="minus"
                        onPress={() => handleQuantityChange(item.id, false)}
                      />
                      <Text>
                        {value.find((v) => v.feed === item.id)?.quantity}
                      </Text>
                      <IconButton
                        icon="plus"
                        onPress={() => handleQuantityChange(item.id, true)}
                      />
                    </View>
                  )}
                />
              )}
            />
            <Button
              mode="contained"
              style={{
                position: "absolute",
                bottom: 20,
                width: "100%",
                right: 10,
                left: 10,
              }}
              onPress={toggleShowItems}
            >
              Ok
            </Button>
          </View>
        </Modal>
      )}
    </>
  );
};

export default FeedsInput;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    padding: 10,
  },
});
