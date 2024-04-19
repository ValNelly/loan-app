import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Avatar, Card, FAB, Text } from "react-native-paper";
import { Loan } from "../../../lib/entities";
import { getLoans } from "../../loan/api";
import moment from "moment/moment";
import { useFocusEffect } from "@react-navigation/native";
import { MainRouteName } from "../../../navigation/route";
import { AdminRoutNames } from "../navigation/route";

const LoansScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);

  const handleFetch = async () => {
    setLoading(true);
    const loanResponse = await getLoans();
    if (loanResponse.ok) setLoans((loanResponse.data as any).results);
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
        data={loans}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const { amount, interestRate, createdAat } = item;
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(MainRouteName.ADMIN_NAVIGATION, {
                  screen: AdminRoutNames.LOAN_FORM_SCREEN,
                  params: item,
                });
              }}
            >
              <Card.Title
                title={`Ksh. ${amount} Loan`}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={require("../../../../assets/loan.png")}
                  />
                )}
                style={{ marginBottom: 5, backgroundColor: "white" }}
                subtitle={moment(createdAat).format("Do ddd MMM yyy")}
                right={(props) => (
                  <View {...props}>
                    <Text>{`${interestRate}% Interest`}</Text>
                  </View>
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        label="Add Loan"
        icon="plus"
        style={styles.fab}
        onPress={() => {
          navigation.navigate(MainRouteName.ADMIN_NAVIGATION, {
            screen: AdminRoutNames.LOAN_FORM_SCREEN,
          });
        }}
      />
    </View>
  );
};

export default LoansScreen;

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
