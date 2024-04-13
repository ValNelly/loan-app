import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Avatar, Card, FAB, List, Text } from "react-native-paper";
import { LoanRequest } from "../../../lib/entities";
import { getFeeds, getLoanRequests } from "../../loan/api";
import moment from "moment/moment";
import { useFocusEffect } from "@react-navigation/native";
import { MainRouteName } from "../../../navigation/route";
import { AdminRoutNames } from "../navigation/route";

const LoanRequestScreens = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);

  const handleFetch = async () => {
    setLoading(true);
    const loanRequestReposne = await getLoanRequests();
    if (loanRequestReposne.ok)
      setLoanRequests((loanRequestReposne.data as any).results);
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
        data={loanRequests}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const {
            amount,
            feedsLoan,
            status,
            loan,
            user: { name },
            createdAat,
          } = item;
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(MainRouteName.ADMIN_NAVIGATION, {
                  screen: AdminRoutNames.LOAN_REQUEST_DETAIL_SCREEN,
                  params: item,
                });
              }}
            >
              <Card.Title
                title={name}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={require("../../../../assets/applicant.png")}
                  />
                )}
                style={{ marginBottom: 5, backgroundColor: "white" }}
                subtitle={`${status} | ${moment(createdAat).format(
                  "Do ddd MMM yyy"
                )}`}
                right={(props) => (
                  <View>
                    <Text>{`Ksh. ${amount}    `}</Text>
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

export default LoanRequestScreens;

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
