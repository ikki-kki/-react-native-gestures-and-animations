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
  eq,
  cond,
  startClock,
  interpolate,
  Extrapolate,
  add
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
  const { from, to, clock, progress } = useMemoOne(
    () => ({
      clock: new Clock(),
      progress: new Value(0),
      from: new Value(0),
      to: new Value(0)
    }),
    []
  );
  // The only side effect in our component is setShow
  // if they where other we would write
  // time = useMemoOne(() => new Value(-1), [show]);
  const time = new Value(-1);
  useCode(
    () =>
      block([
        // 1. If the clock is not running
        // start the clock and save the original clock value in
        cond(eq(time, -1), [
          set(from, progress),
          set(to, show ? 1 : 0),
          startClock(clock),
          set(time, clock)
        ]),
        // 2. Calculate the progress of the animation
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, duration)],
            outputRange: [from, to],
            extrapolate: Extrapolate.CLAMP
          })
        )
      ]),
    [clock, from, progress, show, time, to]
  );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity: progress }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <Button
        label={show ? "Hide" : "Show"}
        primary
        onPress={() => setShow(prev => !prev)}
      />
    </View>
  );
};
