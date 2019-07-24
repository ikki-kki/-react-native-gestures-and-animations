import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { loop } from "react-native-redash";
import { useMemoOne } from "use-memo-one";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { StyleGuide, Button } from "../components";

const {
  Clock,
  Value,
  useCode,
  set,
  block,
  cond,
  startClock,
  stopClock,
  clockRunning,
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

export default () => {
  const [play, setPlay] = useState(true);
  const { clock, isPlaying, progress } = useMemoOne(
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
