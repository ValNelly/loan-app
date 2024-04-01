import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import SafeArea from "../../../components/layout/SafeArea";
import Logo from "../../../components/display/Logo";
import Form from "../../../components/form/Form";
import { LoginSchema, RegisterSchema } from "../schema";
import { FormSubmitButton, FormTextInput } from "../../../components/input";
import LinkedText from "../widgets/LinkedText";
import { AuthRoutNames } from "../navigation/route";
import { register } from "../api";
import UserContext from "../../../lib/context/user";

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  const handleLogin = async (values: any, { setErrors, errors }: any) => {
    setLoading(true);
    const response = await register(values);
    setLoading(false);
    if (response.ok) {
      const token = (response.data as any).token;
      userContext?.setToken(token);
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
            <FormTextInput
              name="phoneNumber"
              label="Phone number"
              prefixIcon="phone"
            />
            <FormTextInput name="email" label="Email" prefixIcon="email" />
            <FormTextInput
              name="password"
              label="Password"
              prefixIcon="lock"
              password
            />
            <FormTextInput
              name="confirmPassword"
              label="Confirm Password"
              prefixIcon="lock"
              password
            />
            <View style={{ marginTop: 20 }}>
              <FormSubmitButton title="Register" loading={loading} />
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
