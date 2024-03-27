import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { useFormikContext } from "formik";

interface Props {
  name: string;
  error?: string;
  label?: string;
  variant?: "flat" | "outlined";
  prefixIcon?: string;
  onPrefixIconPressed?: () => void;
  surfixIcon?: string;
  onSurfixIconPressed?: () => void;
  helpText?: string;
  password?: boolean;
}

const FormTextInput: React.FC<Props> = ({
  label,
  variant = "outlined",
  prefixIcon,
  onPrefixIconPressed,
  onSurfixIconPressed,
  surfixIcon,
  name,
  helpText,
  password = false,
}) => {
  const { values, errors, handleChange } = useFormikContext();
  const [hideContent, setHidecontent] = useState(password);
  return (
    <View>
      <TextInput
        onChangeText={handleChange(name)}
        error={Boolean((errors as any)[name])}
        label={label}
        mode={variant}
        value={(values as any)[name]}
        secureTextEntry={hideContent}
        left={
          prefixIcon && (
            <TextInput.Icon icon={prefixIcon} onPress={onPrefixIconPressed} />
          )
        }
        right={
          password ? (
            <TextInput.Icon
              icon={hideContent ? "eye" : "eye-off"}
              onPress={() => setHidecontent(!hideContent)}
            />
          ) : (
            prefixIcon && (
              <TextInput.Icon
                icon={surfixIcon as any}
                onPress={onSurfixIconPressed}
              />
            )
          )
        }
      />
      {((errors as any)[name] || helpText) && (
        <HelperText
          type={(errors as any)[name] ? "error" : "info"}
          visible={Boolean((errors as any)[name])}
        >
          {(errors as any)[name] ? (errors as any)[name] : helpText}
        </HelperText>
      )}
    </View>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({});
