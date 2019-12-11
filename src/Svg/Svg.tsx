import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Constants from "expo-constants";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent } from "react-native-redash";
import { StyleGuide } from "../components";

const { Value, sub } = Animated;
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const radius = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const x = new Value(0);
  const y = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ y, x, state });
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedEllipse
          cx={sub(x, containerWidth / 2)}
          cy={sub(y, containerHeight / 2)}
          rx={sub(x, radius)}
          ry={sub(y, radius)}
          fill={StyleGuide.palette.primary}
        />
      </Svg>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};
