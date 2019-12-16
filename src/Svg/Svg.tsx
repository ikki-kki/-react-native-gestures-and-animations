import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Constants from "expo-constants";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent } from "react-native-redash";
import { StyleGuide, withTransition } from "../components";

const { Value, sub, multiply, abs, cond, eq, max } = Animated;
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const center = {
  x: containerWidth / 2,
  y: containerHeight / 2
};
const canvas2Euclidean = (
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>
) => {
  return { cx: sub(x, center.x), cy: multiply(sub(y, center.y), -1) };
};
const radius = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const x = new Value(0);
  const y = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ y, x, velocityX, velocityY, state });
  const isActive = eq(state, State.ACTIVE);
  const targetX = cond(isActive, x, center.x);
  const targetY = cond(isActive, y, center.y);
  const x1 = withTransition(targetX, velocityX);
  const y1 = withTransition(targetY, velocityY);
  const { cx, cy } = canvas2Euclidean(x1, y1);
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedEllipse
          cx={center.x}
          cy={center.y}
          rx={max(abs(cx), radius)}
          ry={max(abs(cy), radius)}
          fill={StyleGuide.palette.primary}
        />
      </Svg>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};
