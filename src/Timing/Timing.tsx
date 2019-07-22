import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { StyleGuide, Button } from "../components";

const {
  Clock,
  Value,
  useCode,
  set,
  block,
  timing,
  cond,
  startClock,
  stopClock,
  clockRunning,
  onChange,
  and,
  not
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background
  }
});

interface LoopProps {
  clock?: Animated.Clock;
  easing?: Animated.EasingFunction;
  duration?: number;
  boomerang?: boolean;
  autoStart?: boolean;
}

const loop = (loopConfig: LoopProps) => {
  const { clock, easing, duration, boomerang, autoStart } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    boomerang: false,
    autoStart: true,
    ...loopConfig
  };
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
    cond(and(not(clockRunning(clock)), autoStart ? 1 : 0), startClock(clock)),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      boomerang
        ? set(config.toValue, cond(config.toValue, 0, 1))
        : set(state.position, 0)
    ]),
    state.position
  ]);
};

export default () => {
  const [play, setPlay] = useState(true);
  const { clock, isPlaying, progress } = useMemo(
    () => ({
      clock: new Clock(),
      isPlaying: new Value(0) as Animated.Value<0 | 1>,
      progress: new Value(0)
    }),
    []
  );
  isPlaying.setValue(play ? 1 : 0);
  useCode(
    block([
      cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
      cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
      set(
        progress,
        loop({
          clock,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: false
        })
      )
    ]),
    []
  );
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator {...{ progress }} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => setPlay(!play)}
      />
    </View>
  );
};
