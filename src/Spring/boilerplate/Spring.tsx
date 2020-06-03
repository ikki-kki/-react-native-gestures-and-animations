import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent } from "react-native-redash";
import { Card, StyleGuide, cards } from "../../components";
import { CARD_HEIGHT, CARD_WIDTH } from "../../components/Card";

const {
  Clock,
  Value,
  diffClamp,
  cond,
  set,
  eq,
  add,
  decay,
  clockRunning,
  startClock,
  stopClock,
  block,
  and,
  not,
} = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const offsetX = new Value((containerWidth - CARD_WIDTH) / 2);
const offsetY = new Value((containerHeight - CARD_HEIGHT) / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
});
const [card] = cards;

const withDecay = (
  value: Animated.Value<number>,
  velocity: Animated.Value<number>,
  gestureState: Animated.Value<State>,
  offset: Animated.Value<number>
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = { deceleration: 0.998 };

  const isDecayInterrupted = and(
    eq(gestureState, State.BEGAN),
    clockRunning(clock)
  );
  const finishDecay = [set(offset, state.position), stopClock(clock)];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(
      eq(gestureState, State.END),
      [
        cond(and(not(clockRunning(clock)), not(state.finished)), [
          set(state.velocity, velocity),
          set(state.time, 0),
          startClock(clock),
        ]),
        decay(clock, state, config),
        cond(state.finished, finishDecay),
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position,
  ]);
};

const Spring = () => {
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
    velocityY,
  });
  const translateX = diffClamp(
    withDecay(translationX, velocityX, state, offsetX),
    0,
    containerWidth - CARD_WIDTH
  );
  const translateY = diffClamp(
    withDecay(translationY, velocityY, state, offsetY),
    0,
    containerHeight - CARD_HEIGHT
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }],
          }}
        >
          <Card {...{ card }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Spring;
