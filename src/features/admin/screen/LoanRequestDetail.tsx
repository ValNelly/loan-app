import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { LoanRequest } from "../../../lib/entities";
import { Button, List, Text } from "react-native-paper";
import moment from "moment/moment";
import { updateLoanRequestStatus } from "../../loan/api";

const LoanRequestDetail = ({ navigation, route }: any) => {
  const loanRequest: LoanRequest = route.params;
  const [loading, setLoading] = useState(false);

  const handleUpdateLoanRequestStatus = async (action: "reject" | "aprove") => {
    setLoading(true);
    const response = await updateLoanRequestStatus(loanRequest.id, action);
    if (response.ok) {
      Alert.alert(
        "Success!",
        `Loan request ${
          action === "aprove" ? "Aproved" : "Rejected"
        } successfully!`,
        [{ text: "Ok", onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert("Failure!", `${(response.data as any).detail}`, [
        { text: "Ok" },
      ]);
    }
    setLoading(false);
  };
  return (
    <ScrollView>
      <Text style={styles.title} variant="titleMedium">
        Applicant Details
      </Text>
      <List.Item
        title={"Name"}
        description={loanRequest.user.name ?? loanRequest.user.username}
        left={(props) => <List.Icon {...props} icon={"account"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      <List.Item
        title={"Email"}
        description={loanRequest.user.email}
        left={(props) => <List.Icon {...props} icon={"email"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      <List.Item
        title={"Phone number"}
        description={loanRequest.user.phoneNumber}
        left={(props) => <List.Icon {...props} icon={"phone"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      <Text style={styles.title} variant="titleMedium">
        Loan Details
      </Text>
      <List.Item
        title={"Amount"}
        description={`Ksh. ${loanRequest.amount}`}
        left={(props) => <List.Icon {...props} icon={"cash"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      <List.Item
        title={"Loan Type"}
        description={`${loanRequest.type}`}
        left={(props) => <List.Icon {...props} icon={"format-list-bulleted"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      <List.Item
        title={"Status"}
        description={`${loanRequest.status}`}
        left={(props) => <List.Icon {...props} icon={"progress-clock"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      <List.Item
        title={"Application date"}
        description={`${moment(loanRequest.createdAat).format(
          "Do ddd MMM yyy"
        )}`}
        left={(props) => <List.Icon {...props} icon={"calendar"} />}
        style={{ backgroundColor: "white", marginBottom: 5 }}
      />
      {loanRequest.feedsLoan.length > 0 && (
        <>
          <Text style={styles.title} variant="titleMedium">
            Feeds Details
          </Text>
          {loanRequest.feedsLoan.map(
            ({ quantity, feed: { loans, name, unitPrice } }, index) => (
              <List.Item
                key={index}
                title={name}
                description={`${quantity} Kg @ Ksh.${unitPrice}`}
                left={(props) => <List.Icon {...props} icon={"calendar"} />}
                right={(props) => (
                  <Text variant="titleMedium">{`Ksh. ${
                    parseFloat(quantity) * parseFloat(unitPrice)
                  }`}</Text>
                )}
                style={{ backgroundColor: "white", marginBottom: 5 }}
              />
            )
          )}
        </>
      )}
      {loanRequest.status === "Pending" && (
        <View style={{ padding: 10 }}>
          <Button
            mode="contained"
            loading={loading}
            onPress={async () => await handleUpdateLoanRequestStatus("aprove")}
          >
            Aprrove
          </Button>
          <Button
            style={{ marginVertical: 10 }}
            mode="contained"
            loading={loading}
            onPress={async () => await handleUpdateLoanRequestStatus("reject")}
          >
            Reject
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

export default LoanRequestDetail;

const styles = StyleSheet.create({
  title: {
    padding: 5,
  },
});
