import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent } from "react-native-redash";
import { Card, StyleGuide, cards, withSpring } from "../components";
import { CARD_HEIGHT, CARD_WIDTH } from "../components/Card";

const { Value, Clock, startClock, useCode, block, spring, set } = Animated;
const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 1
};
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const snapX = (containerWidth - CARD_WIDTH) / 2;
const snapY = (containerHeight - CARD_HEIGHT) / 2;
const offsetX = new Value(snapX);
const offsetY = new Value(snapY);
const createState = () => ({
  x: {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(snapX),
    time: new Value(0)
  },
  y: {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(snapY),
    time: new Value(0)
  }
});
const createConfig = () => ({
  x: {
    toValue: new Value(0),
    ...config
  },
  y: {
    toValue: new Value(0),
    ...config
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});
const [frontCard, middleCard, backCard] = cards;

export default () => {
  const clock = new Clock();
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
    snapPoints: [snapX]
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    offset: offsetY,
    snapPoints: [snapY]
  });
  const states = [createState(), createState()];
  const configs = [createConfig(), createConfig()];
  useCode(
    () =>
      block([
        startClock(clock),
        set(configs[0].x.toValue, translateX),
        set(configs[0].y.toValue, translateY),
        spring(clock, states[0].x, configs[0].x),
        spring(clock, states[0].y, configs[0].y),
        set(configs[1].x.toValue, states[0].x.position),
        set(configs[1].y.toValue, states[0].y.position),
        spring(clock, states[1].x, configs[1].x),
        spring(clock, states[1].y, configs[1].y)
      ]),
    [clock, configs, states, translateX, translateY]
  );
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateX: states[1].x.position },
            { translateY: states[1].y.position }
          ]
        }}
      >
        <Card card={backCard} />
      </Animated.View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateX: states[0].x.position },
            { translateY: states[0].y.position }
          ]
        }}
      >
        <Card card={middleCard} />
      </Animated.View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ translateX }, { translateY }]
          }}
        >
          <Card card={frontCard} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
