import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../../components/layout";
import Logo from "../../../components/display/Logo";
import Form from "../../../components/form/Form";
import { UserSchema } from "../schema";
import {
  FormItemPicker,
  FormSubmitButton,
  FormTextInput,
} from "../../../components/input";
import { User } from "../../../lib/entities";
import { List } from "react-native-paper";
import { addUser, updateUser } from "../../auth/api";
import FormCheckbox from "../../../components/input/check_box/FormCheckbox";

const UserFormScreen = ({ navigation, route }: any) => {
  // const user: User | undefined = route.params;
  const { user, profile } = route.params as {
    user: User | undefined;
    profile: boolean;
  };
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any, { setErrors, errors }: any) => {
    setLoading(true);
    let response;
    if (user) response = await updateUser(user.id, values);
    else response = await addUser(values);
    setLoading(false);
    if (response.ok) {
      Alert.alert(
        "Success!",
        `User ${user ? "Updated" : "Added"} successfully`,
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
            validationSchema={UserSchema}
            initialValue={{
              name: user?.name ?? "",
              username: user?.username ?? "",
              email: user?.email ?? "",
              phoneNumber: user?.phoneNumber ?? "",
              gender: user?.gender ?? "",
              isStaff: user?.isStaff,
            }}
            onSubmit={handleLogin}
          >
            <FormTextInput name="name" label="Name" prefixIcon="account" />
            <FormTextInput
              name="username"
              label="Username"
              prefixIcon="account"
            />
            <FormTextInput name="email" label="Email" prefixIcon="email" />
            <FormTextInput
              name="phoneNumber"
              label="Phone number"
              prefixIcon="phone"
            />
            <FormItemPicker
              variant="outlined"
              name="gender"
              label="Gender"
              valueExtractor={({ value }) => value}
              labelExtractor={({ label }) => label}
              prefixIcon="format-align-justify"
              renderItem={({ item }) => (
                <List.Item
                  title={item.label}
                  left={(props) => (
                    <List.Icon {...props} icon={"format-align-justify"} />
                  )}
                />
              )}
              surfixIcon="chevron-down"
              data={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
              ]}
            />
            {!profile && <FormCheckbox label="Is staff" name="isStaff" />}
            <View style={{ marginTop: 20 }}>
              <FormSubmitButton
                title={user ? "Update User" : "Add Loan"}
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

export default UserFormScreen;

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
