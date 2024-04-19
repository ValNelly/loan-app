import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Loan } from "../../../lib/entities";
import { addLoan, updateLoan } from "../../loan/api";
import { SafeArea } from "../../../components/layout";
import Logo from "../../../components/display/Logo";
import Form from "../../../components/form/Form";
import { LoanSchema } from "../schema";
import { FormSubmitButton, FormTextInput } from "../../../components/input";

const LoanFormScreen = ({ navigation, route }: any) => {
  const loan: Loan | undefined = route.params;
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any, { setErrors, errors }: any) => {
    setLoading(true);
    let response;
    if (loan) response = await updateLoan(loan.id, values);
    else response = await addLoan(values);
    setLoading(false);
    if (response.ok) {
      Alert.alert(
        "Success!",
        `Loan ${loan ? "Updated" : "Added"} successfully`,
        [{ text: "Ok", onPress: () => navigation.goBack() }]
      );
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...(response.data as any).errors });
      } else {
        console.log(response.data);
      }
    }
  };
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Logo />
        <View style={styles.form}>
          <Form
            validationSchema={LoanSchema}
            initialValue={{
              amount: loan?.amount ?? "",
              interestRate: loan?.interestRate ?? "",
            }}
            onSubmit={handleLogin}
          >
            <FormTextInput name="amount" label="Amount" prefixIcon="cash" />
            <FormTextInput
              name="interestRate"
              label="Interest rate"
              prefixIcon="sack-percent"
            />
            <View style={{ marginTop: 20 }}>
              <FormSubmitButton
                title={loan ? "Update Loan" : "Add Loan"}
                loading={loading}
              />
            </View>
          </Form>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </SafeArea>
  );
};

export default LoanFormScreen;

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
