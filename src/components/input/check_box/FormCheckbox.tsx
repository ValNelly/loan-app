import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { Checkbox, HelperText } from "react-native-paper";

interface Props {
  name: string;
  helpText?: string;
  label: string;
}

const FormCheckbox: React.FC<Props> = ({ name, helpText, label }) => {
  const { errors, values, setFieldValue } = useFormikContext();
  const error = (errors as any)[name];
  const value = (values as any)[name];
  return (
    <View style={{ marginVertical: 5 }}>
      <Checkbox.Item
        label={label}
        status={
          value === true
            ? "checked"
            : value === undefined || value === null
            ? "indeterminate"
            : "unchecked"
        }
        onPress={() => setFieldValue(name, !value)}
      />
      {(error || helpText) && (
        <HelperText type={error ? "error" : "info"} visible={Boolean(error)}>
          {error ? error : helpText}
        </HelperText>
      )}
    </View>
  );
};

export default FormCheckbox;

const styles = StyleSheet.create({});
