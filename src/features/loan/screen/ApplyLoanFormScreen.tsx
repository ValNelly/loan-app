import { Alert, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../lib/context/user";
import { SafeArea } from "../../../components/layout";
import Logo from "../../../components/display/Logo";
import {
  FormItemPicker,
  FormSubmitButton,
  FormTextInput,
} from "../../../components/input";
import Form from "../../../components/form/Form";
import { ApplyLoanSchema } from "../schema";
import { FormikConfig, FormikContext } from "formik";
import { ActivityIndicator, IconButton, List, Text } from "react-native-paper";
import { Feed, Loan } from "../../../lib/entities";
import { getFeeds, getLoans, requestLoan } from "../api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedsInput from "../widgets/FeedsInput";
import { MainRouteName } from "../../../navigation/route";
import { CommonRoutNames } from "../../common/navigation/route";

const ApplyLoanFormScreen = ({ navigation }: any) => {
  const userContext = useContext(UserContext);
  const handleApplyLoan = async (values: any, { errors, setErrors }: any) => {
    setsubmitting(true);
    const response = await requestLoan(userContext!.token, values);
    setsubmitting(false);
    if (response.ok) {
      Alert.alert("Success", "Loan request was successfull", [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate(MainRouteName.BOTTOM_TAB_NAVIGATION, {
              screen: CommonRoutNames.MY_LOANS_SCREEN,
            });
          },
        },
      ]);
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...(response.data as any).errors });
      } else {
        console.log(response.data);
      }
    }
  };
  const [loading, setLoading] = useState(false);
  const [submitting, setsubmitting] = useState(false);

  const [loans, setLoans] = useState<Loan[]>([]);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const loansReponse = await getLoans();
      if (loansReponse.ok) setLoans((loansReponse.data as any).results);
      const feedsReposne = await getFeeds();
      if (feedsReposne.ok) setFeeds((feedsReposne.data as any).results);
      setLoading(false);
    })();
  }, []);
  if (loading) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Logo />
      <View style={styles.form}>
        <Form
          validationSchema={ApplyLoanSchema}
          initialValue={{
            loan: "",
            type: "",
            amount: "",
            feeds: [],
          }}
          onSubmit={handleApplyLoan}
        >
          <FormItemPicker
            variant="outlined"
            name="type"
            prefixIcon="list-status"
            valueExtractor={(item) => item.id}
            labelExtractor={(item) => item.label}
            label="Loan Type"
            surfixIcon="chevron-down"
            data={[
              { id: "Money", label: "Monetary Loan" },
              { id: "Feed", label: "Feeds Loan" },
            ]}
            renderItem={({ item }) => (
              <List.Item
                left={(props) => <List.Icon {...props} icon={"list-status"} />}
                title={item.label}
              />
            )}
          />
          <FormItemPicker
            variant="outlined"
            prefixIcon="bank"
            name="loan"
            valueExtractor={(item) => item.id}
            labelExtractor={(item) => item.amount}
            label="Loan"
            searchable
            data={loans}
            renderItem={({ index }) => (
              <List.Item
                title={`Ksh. ${loans[index].amount} Loan`}
                description={`Rate: ${loans[index].interestRate} %`}
                left={(props) => <List.Icon {...props} icon={"bank"} />}
              />
            )}
            surfixIcon="chevron-down"
          />

          <FeedsInput feeds={feeds} />

          {/* <FormTextInput name="amount" label="Loan ammount" prefixIcon="cash" /> */}
          <View style={{ marginTop: 20 }}>
            <FormSubmitButton title="Apply" loading={loading || submitting} />
          </View>
        </Form>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default ApplyLoanFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  form: {
    padding: 20,
    width: "100%",
  },
});
