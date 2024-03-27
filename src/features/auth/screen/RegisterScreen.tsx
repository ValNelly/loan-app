import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SafeArea from "../../../components/layout/SafeArea";
import Logo from "../../../components/display/Logo";
import Form from "../../../components/form/Form";
import { LoginSchema, RegisterSchema } from "../schema";
import { FormSubmitButton, FormTextInput } from "../../../components/input";
import LinkedText from "../widgets/LinkedText";
import { AuthRoutNames } from "../navigation";

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async (
    values: any,
    { setFieldError }: { setFieldError: any }
  ) => {
    setLoading(true);
    // const response = await register(values);
    setLoading(false);
    // if (!response.ok) {
    //   if (response.problem === "CLIENT_ERROR") {
    //     for (const key in response.data) {
    //       const element = response.data[key];
    //       if (element instanceof Array) {
    //         setFieldError(key, element.join(";"));
    //       } else if (element instanceof Object) {
    //         for (const key1 in element) {
    //           const element1 = element[key1];
    //           setFieldError(key1, element1.join(";"));
    //         }
    //       }
    //     }
    //     return console.log("LoginScreen: ", response.problem, response.data);
    //   }
  };
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Logo />
        <View style={styles.form}>
          <Form
            validationSchema={RegisterSchema}
            initialValue={{
              username: "",
              password: "",
              email: "",
              confirm_password: "",
            }}
            onSubmit={handleLogin}
          >
            <FormTextInput
              name="username"
              label="Username"
              prefixIcon="account"
            />
            <FormTextInput name="email" label="Email" prefixIcon="email" />
            <FormTextInput
              name="password"
              label="Password"
              prefixIcon="lock"
              password
            />
            <FormTextInput
              name="confirm_password"
              label="Confirm Password"
              prefixIcon="lock"
              password
            />
            <View style={{ marginTop: 20 }}>
              <FormSubmitButton title="Register" />
            </View>
            <LinkedText
              unlinked="Already have an account? "
              linkedText="Sign in"
              onPress={() => navigation.navigate(AuthRoutNames.LOGIN_SCREEN)}
            />
          </Form>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </SafeArea>
  );
};

export default RegisterScreen;

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
