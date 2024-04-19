import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../../components/display/Logo";
import { LoanRequest } from "../../../lib/entities";
import { List } from "react-native-paper";
import moment from "moment/moment";

const MyLoanDetail = ({ route }: any) => {
  const {
    amount,
    createdAat,
    feedsLoan,
    id,
    loan,
    loandId,
    status,
    type,
    updatedAt,
    user,
    userId,
  } = route.params as LoanRequest;
  return (
    <ScrollView>
      <View style={styles.constianer}>
        <Logo />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`Ksh. ${amount} ${type} Loan`}
          description="Loan"
          left={(props) => <List.Icon {...props} icon={"bank"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${loan.interestRate} %`}
          description="Interest"
          left={(props) => <List.Icon {...props} icon={"bank"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${type} Loan`}
          description="Type"
          left={(props) => <List.Icon {...props} icon={"bank"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${user.name} `}
          description="Applicant"
          left={(props) => <List.Icon {...props} icon={"account"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${user.phoneNumber} `}
          description="Applicant Phone number"
          left={(props) => <List.Icon {...props} icon={"phone"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${user.email} `}
          description="Applicant email"
          left={(props) => <List.Icon {...props} icon={"email"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${moment(createdAat).format("Do dd MM yyy")} `}
          description="Date applied"
          left={(props) => <List.Icon {...props} icon={"calendar"} />}
        />
        <List.Item
          style={{ backgroundColor: "white", marginBottom: 10 }}
          title={`${status} `}
          description="Status"
          left={(props) => <List.Icon {...props} icon={"progress-check"} />}
        />
        {feedsLoan.map(({ feed, quantity }, index) => (
          <List.Item
            key={index}
            style={{ backgroundColor: "white", marginBottom: 10 }}
            title={`${feed.name} | ${quantity} Kgs @ Ksh.${feed.unitPrice}`}
            description="Feed"
            left={(props) => <List.Icon {...props} icon={"food-variant"} />}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default MyLoanDetail;

const styles = StyleSheet.create({
  constianer: {
    flex: 1,
    alignItems: "center",
  },
});
