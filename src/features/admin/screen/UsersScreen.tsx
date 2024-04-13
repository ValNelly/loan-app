import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Avatar, Card, FAB, Icon, IconButton, Text } from "react-native-paper";
import { User } from "../../../lib/entities";
import moment from "moment/moment";
import { useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../auth/api";
import { MainRouteName } from "../../../navigation/route";
import { AdminRoutNames } from "../navigation/route";

const UsersScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleFetch = async () => {
    setLoading(true);
    const userResponse = await getUser();
    if (userResponse.ok) setUsers((userResponse.data as any).results);
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
        data={users}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const { name, createdAat, email, username, phoneNumber, isStaff } =
            item;
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(MainRouteName.ADMIN_NAVIGATION, {
                  screen: AdminRoutNames.USERS_FORM_SCREEN,
                  params: item,
                });
              }}
            >
              <Card.Title
                title={name ?? username}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon={isStaff ? "shield-account" : "account"}
                  />
                )}
                style={{ marginBottom: 5, backgroundColor: "white" }}
                subtitle={`${phoneNumber} | ${email}`}
                right={(props) => (
                  <Avatar.Icon {...props} icon={"chevron-right"} />
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      {/* <FAB
        label="Add Feed"
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // navigation.navigate(MainRouteName.LOANS_NAVIGATION, {
          //   screen: LoanRoutNames.APPLY_LOAN_FORM_SCREEN,
          // })
        }}
      /> */}
    </View>
  );
};

export default UsersScreen;

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
