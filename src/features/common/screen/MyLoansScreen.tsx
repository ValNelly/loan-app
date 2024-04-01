import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { getMyLoans } from "../../loan/api";
import UserContext from "../../../lib/context/user";
import { LoanRequest } from "../../../lib/entities";
import { FAB, List, Text } from "react-native-paper";
import { SafeArea } from "../../../components/layout";
import moment from "moment/moment";
import { MainRouteName } from "../../../navigation/route";
import { LoanRoutNames } from "../../loan/navigation/route";
import { useFocusEffect } from "@react-navigation/native";

const MyLoansScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);
  const [myLoans, setMyLoans] = useState<LoanRequest[]>([]);
  const handleFetch = useCallback(async () => {
    const response = await getMyLoans(userContext!.token);
    if (response.ok) setMyLoans((response.data as any).results);
  }, []);
  useFocusEffect(() => {
    handleFetch();
  });

  return (
    <SafeArea>
      <FlatList
        data={myLoans}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { amount, createdAat, status, loan, type } }) => (
          <List.Item
            style={{ backgroundColor: "white", marginBottom: 10 }}
            title={`Ksh. ${amount} ${type} Loan`}
            description={`Status: ${status} | ${moment(createdAat).format(
              "Do dd MM yyy"
            )}`}
            left={(props) => <List.Icon {...props} icon={"bank"} />}
            right={(props) => <List.Icon {...props} icon={"chevron-right"} />}
          />
        )}
      />
      <FAB
        label="Request Loan"
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate(MainRouteName.LOANS_NAVIGATION, {
            screen: LoanRoutNames.APPLY_LOAN_FORM_SCREEN,
          })
        }
      />
    </SafeArea>
  );
};

export default MyLoansScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
