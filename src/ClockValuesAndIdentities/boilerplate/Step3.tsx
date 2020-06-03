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
import { Button, Card, cards } from "../../components";

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
  const duration = 500;
  const startAnimation = new Value<0 | 1>(0);
  const startTime = new Value<number>(0);
  const endTime = add(startTime, duration);
  const from = new Value<0 | 1>(0);
  const to = new Value<0 | 1>(1);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });
  useCode(
    () => [
      startClock(clock),
      cond(eq(startAnimation, 1), [
        set(from, opacity),
        set(to, not(to)),
        set(startTime, clock),
        set(startAnimation, 0),
      ]),
    ],
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
        label="Toggle"
        primary
        onPress={() => startAnimation.setValue(1)}
      />
    </View>
  );
};

export default ClockValuesAndIdentity;
