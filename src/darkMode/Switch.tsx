import * as React from "react";
import { View, Switch, StyleSheet, Platform } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { StyleGuide } from "../components";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: StyleGuide.spacing * 2,
    alignItems: "center"
  },
  switch: {
    marginRight: StyleGuide.spacing
  }
});

export default ({ value, onValueChange }: SwitchProps) => {
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        thumbColor={Platform.OS === "android" ? "white" : undefined}
        trackColor={{
          false: StyleGuide.palette.primary,
          true: StyleGuide.palette.primary
        }}
        {...{ value, onValueChange }}
      />
      {value && <Icon name="sun" color="white" size={32} />}
      {!value && (
        <Icon name="moon" color={StyleGuide.palette.primary} size={32} />
      )}
    </View>
  );
};
