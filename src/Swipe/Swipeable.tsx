import * as React from "react";
import { StyleSheet } from "react-native";
import { onGestureEvent } from "react-native-redash";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { withSpring } from "../components";

const { Value, useCode, block, set } = Animated;
const config = {
  damping: 40,
  mass: 1,
  stiffness: 300,
  overshootClamping: false,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 1
};
interface SwipeableProps {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
  offsetX?: Animated.Value<number>;
  offsetY?: Animated.Value<number>;
  snapPoints: number[];
  onSnap: (value: readonly number[]) => void;
}

export default ({
  x,
  y,
  offsetX,
  offsetY,
  snapPoints,
  onSnap
}: SwipeableProps) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    velocityX,
    translationX,
    translationY,
    state
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    offset: offsetX,
    state,
    snapPoints,
    onSnap,
    config
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    offset: offsetY || new Value(0),
    state,
    snapPoints: [0],
    config
  });
  useCode(() => block([set(x, translateX), set(y, translateY)]), [
    translateX,
    translateY,
    x,
    y
  ]);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
