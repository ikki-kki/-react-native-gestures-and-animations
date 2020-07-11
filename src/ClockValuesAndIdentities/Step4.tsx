import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  add,
  block,
  cond,
  eq,
  interpolate,
  not,
  proc,
  set,
  startClock,
  useCode,
} from "react-native-reanimated";
import { useClock, useValues } from "react-native-redash";

import { Button, Card, cards } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const duration = 500;
const runAnimation = proc(
  (
    clock: Animated.Clock,
    from: Animated.Value<number>,
    to: Animated.Value<number>,
    startTime: Animated.Value<number>,
    startAnimation: Animated.Value<number>,
    opacity: Animated.Node<number>
  ) =>
    block([
      startClock(clock),
      cond(eq(startAnimation, 1), [
        set(from, opacity),
        set(to, not(to)),
        set(startTime, clock),
        set(startAnimation, 0),
      ]),
    ])
);

const ClockValuesAndIdentity = () => {
  const [show, setShow] = useState(true);
  const clock = useClock();
  const [startTime, from, to, startAnimation] = useValues(0, 0, 0, 0);
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });
  useCode(() => set(startAnimation, 1), [show]);
  useCode(
    () => runAnimation(clock, from, to, startTime, startAnimation, opacity),
    [clock, from, opacity, startAnimation, startTime, to]
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
        onPress={() => setShow((prev) => !prev)}
      />
    </View>
  );
};

export default ClockValuesAndIdentity;
