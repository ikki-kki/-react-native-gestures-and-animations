import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { withOffset } from "../components";

const { Value, event, useCode, block, set, diffClamp, sub } = Animated;
export const CONTROL_POINT_RADIUS = 20;

interface AnimatedPoint {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
}

interface Point {
  x: number;
  y: number;
}

interface ControlPointProps {
  point: AnimatedPoint;
  defaultPoint: Point;
  backgroundColor: string;
  min: number;
  max: number;
}

export default ({
  point: { x, y },
  defaultPoint,
  min,
  max,
  backgroundColor
}: ControlPointProps) => {
  const translationX = new Value(defaultPoint.x);
  const translationY = new Value(defaultPoint.y);
  const state = new Value(State.UNDETERMINED);
  const x1 = withOffset({ value: translationX, state });
  const y1 = withOffset({ value: translationY, state });
  const translateX = diffClamp(x1, min, max);
  const translateY = diffClamp(y1, min, max);
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        translationY,
        state
      }
    }
  ]);
  useCode(() => block([set(x, translateX), set(y, translateY)]), [
    translateX,
    translateY,
    x,
    y
  ]);
  return (
    <PanGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{ onGestureEvent }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: CONTROL_POINT_RADIUS * 2,
          height: CONTROL_POINT_RADIUS * 2,
          borderRadius: CONTROL_POINT_RADIUS,
          borderWidth: 4,
          backgroundColor,
          transform: [
            { translateX: sub(translateX, CONTROL_POINT_RADIUS) },
            { translateY: sub(translateY, CONTROL_POINT_RADIUS) }
          ]
        }}
      />
    </PanGestureHandler>
  );
};
