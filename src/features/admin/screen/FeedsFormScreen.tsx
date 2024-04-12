import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../../components/layout";
import Logo from "../../../components/display/Logo";
import Form from "../../../components/form/Form";
import { FeedSchema } from "../schema";
import { FormSubmitButton, FormTextInput } from "../../../components/input";
import { addFeed, updateFeed } from "../../loan/api";
import { Feed } from "../../../lib/entities";

const FeedsFormScreen = ({ navigation, route }: any) => {
  const feed: Feed | undefined = route.params;
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any, { setErrors, errors }: any) => {
    setLoading(true);
    let response;
    if (feed) response = await updateFeed(feed.id, values);
    else response = await addFeed(values);
    setLoading(false);
    if (response.ok) {
      Alert.alert(
        "Success!",
        `Feed ${feed ? "Updated" : "Added"} successfully`,
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
            validationSchema={FeedSchema}
            initialValue={{
              name: feed?.name ?? "",
              unitPrice: feed?.unitPrice ?? "",
            }}
            onSubmit={handleLogin}
          >
            <FormTextInput name="name" label="Name" prefixIcon="food-variant" />
            <FormTextInput
              name="unitPrice"
              label="Unit price"
              prefixIcon="cash"
            />
            <View style={{ marginTop: 20 }}>
              <FormSubmitButton
                title={feed ? "Update Feed" : "Add Feed"}
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

export default FeedsFormScreen;

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
