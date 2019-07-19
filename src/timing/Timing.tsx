import React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import SimpleActivityIndicator from "./SimpleActivityIndicator";

const { Value } = Animated;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const progress = new Value(0);
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator {...{ progress }} />
    </View>
  );
};
