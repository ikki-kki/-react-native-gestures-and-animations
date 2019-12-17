import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Constants from "expo-constants";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent } from "react-native-redash";
import { StyleGuide, withTransition } from "../components";

const { Value, sub, multiply, eq, cond, max, abs } = Animated;
const { width, height } = Dimensions.get("window");
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const center = {
  x: containerWidth / 2,
  y: containerHeight / 2
};
const radius = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const canvas2Euclidean = (
  x: Animated.Node<number>,
  y: Animated.Node<number>
) => {
  return {
    rx: sub(x, center.x),
    ry: multiply(sub(y, center.y), -1)
  };
};

export default () => {
  const x = new Value(0);
  const y = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    x,
    y,
    velocityX,
    velocityY,
    state
  });
  const isActive = eq(state, State.ACTIVE);
  const targetX = cond(isActive, x, center.x);
  const targetY = cond(isActive, y, center.y);
  const { rx, ry } = canvas2Euclidean(
    withTransition(targetX, velocityX),
    withTransition(targetY, velocityY)
  );
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedEllipse
          cx={center.x}
          cy={center.y}
          rx={max(abs(rx), radius)}
          ry={max(abs(ry), radius)}
          fill={StyleGuide.palette.primary}
        />
      </Svg>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};
