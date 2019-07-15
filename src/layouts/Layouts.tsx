import React from "react";
import { View, StyleSheet } from "react-native";

import { Card, StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: StyleGuide.palette.background
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <Card />
    </View>
  );
};
