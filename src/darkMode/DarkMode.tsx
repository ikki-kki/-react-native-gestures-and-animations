import * as React from "react";
import { View, StyleSheet } from "react-native";

interface ComponentNameProps {}

export default () => {
  return (
    <View
      style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "cyan" }}
    />
  );
};
