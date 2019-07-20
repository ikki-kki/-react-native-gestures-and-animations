import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { StyleGuide } from "../components";

const {
  Clock,
  Value,
  useCode,
  block,
  set,
  cond,
  not,
  clockRunning,
  startClock,
  timing
} = Animated;

const runLoop = (
  clock: Animated.Clock,
  duration: Animated.Adaptable<number>,
  easing: Animated.EasingFunction
) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };
  const config = {
    toValue: new Value(1),
    duration,
    easing
  };

  return block([
    cond(not(clockRunning(clock)), startClock(clock)),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, cond(config.toValue, 0, 1))
    ]),
    state.position
  ]);
};

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
  useCode(set(progress, runLoop(clock, 1000, Easing.inOut(Easing.ease))), []);
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator {...{ progress }} />
    </View>
  );
};
