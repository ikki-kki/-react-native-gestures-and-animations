import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { runLoop } from "react-native-redash";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { StyleGuide } from "../components";

const { Clock, Value, useCode, set } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.background
  }
});

export default () => {
  const clock = new Clock();
  const progress = new Value(0);
  useCode(
    set(progress, runLoop(clock, 1000, Easing.inOut(Easing.ease), true)),
    []
  );
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator {...{ progress }} />
    </View>
  );
};
