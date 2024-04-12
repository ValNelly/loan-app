import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { Avatar, Card, FAB, List, Text } from "react-native-paper";
import { Feed } from "../../../lib/entities";
import { getFeeds } from "../../loan/api";
import moment from "moment/moment";
import { useFocusEffect } from "@react-navigation/native";

const FeedsScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const handleFetch = async () => {
    setLoading(true);
    const feedsReposne = await getFeeds();
    if (feedsReposne.ok) setFeeds((feedsReposne.data as any).results);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetch}
        data={feeds}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const { name, createdAat, unitPrice } = item;
          return (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate(MainRouteName.LOANS_NAVIGATION, {
                //   screen: LoanRoutNames.APPLY_LOAN_FORM_SCREEN,
                // })
              }}
            >
              <Card.Title
                title={name}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={require("../../../../assets/feed.png")}
                  />
                )}
                style={{ marginBottom: 5, backgroundColor: "white" }}
                subtitle={moment(createdAat).format("Do ddd MMM yyy")}
                right={(props) => (
                  <View {...props}>
                    <Text>{`Ksh. ${unitPrice} per Kg`}</Text>
                  </View>
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        label="Add Feed"
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // navigation.navigate(MainRouteName.LOANS_NAVIGATION, {
          //   screen: LoanRoutNames.APPLY_LOAN_FORM_SCREEN,
          // })
        }}
      />
    </View>
  );
};

export default FeedsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
