import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Clock,
  Extrapolate,
  Value,
  add,
  cond,
  eq,
  interpolate,
  not,
  set,
  startClock,
  useCode,
} from "react-native-reanimated";
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

const ClockValuesAndIdentity = () => {
  const clock = new Clock();
  const startTime = new Value<number>(0);
  const duration = 3000;
  const from = new Value<0 | 1>(0);
  const to = new Value<0 | 1>(1);
  useCode(
    () => [
      startClock(clock),
      cond(eq(startTime, -1), [
        set(startTime, clock),
        set(from, not(from)),
        set(to, not(to)),
      ]),
    ],
    [clock, from, startTime, to]
  );
  const opacity = interpolate(clock, {
    inputRange: [startTime, add(startTime, duration)],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <Button label="Toggle" primary onPress={() => startTime.setValue(-1)} />
    </View>
  );
};

export default ClockValuesAndIdentity;
