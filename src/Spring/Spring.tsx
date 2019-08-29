import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent } from "react-native-redash";
import { cards, StyleGuide, Card } from "../components";
import { CARD_WIDTH, CARD_HEIGHT } from "../components/Card";

const {
  Clock,
  Value,
  cond,
  set,
  eq,
  add,
  spring: reSpring,
  clockRunning,
  startClock,
  stopClock,
  block,
  and,
  not,
  neq
} = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const snapX = (containerWidth - CARD_WIDTH) / 2;
const snapY = (containerHeight - CARD_HEIGHT) / 2;
const offsetX = new Value(snapX);
const offsetY = new Value(snapY);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});
const [card] = cards;

interface SpringConfig extends Animated.SpringConfig {
  toValue: Animated.Value<number>;
}

interface WithSpringProps {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  snapPoint: number;
  offset?: Animated.Value<number>;
  config?: SpringConfig;
}

const withSpring = (props: WithSpringProps) => {
  const { value, velocity, state, snapPoint, offset, config } = {
    offset: new Value(0),
    config: {
      toValue: new Value(0),
      damping: 6,
      mass: 1,
      stiffness: 64,
      overshootClamping: false,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 1
    },
    ...props
  };
  const clock = new Clock();
  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [set(offset, springState.position), stopClock(clock)];

  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(neq(state, State.END), [
      set(springState.finished, 0),
      set(springState.position, add(offset, value))
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(config.toValue, snapPoint),
        startClock(clock)
      ]),
      reSpring(clock, springState, config),
      cond(springState.finished, [...finishSpring])
    ]),
    springState.position
  ]);
};

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    offset: offsetX,
    snapPoint: snapX
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    offset: offsetY,
    snapPoint: snapY
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }]
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
