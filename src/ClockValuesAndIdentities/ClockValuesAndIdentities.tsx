import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { useMemoOne } from "use-memo-one";
import { Button, Card, cards } from "../components";

const {
  useCode,
  set,
  Value,
  Clock,
  block,
  not,
  cond,
  clockRunning,
  startClock,
  interpolate,
  Extrapolate,
  add,
  eq,
  stopClock
} = Animated;

const duration = 2000;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const [show, setShow] = useState(true);
  const { time, clock, progress } = useMemoOne(
    () => ({
      time: new Value(0),
      clock: new Clock(),
      progress: new Value(0)
    }),
    []
  );
  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0]
  });
  useCode(
    () =>
      block([
        // 1. If the clock is not running
        // start the clock and save the original clock value in
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        // 2. Calculate the progress of the animation
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, duration)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP
          })
        ),
        // 3. If the animation is over, stop the clock
        cond(eq(progress, 1), stopClock(clock))
      ]),
    [clock, progress, time]
  );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <Button
        label={show ? "Hide" : "Show"}
        primary
        onPress={() => setShow(!show)}
      />
    </View>
  );
};
