import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const { PI } = Math;
const { multiply } = Animated;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  theta: Animated.Node<number>;
  r: number;
  bg: string;
  fg: string;
  strokeWidth: number;
}

export default ({ theta, r, bg, fg, strokeWidth }: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  const strokeDashoffset = multiply(theta, radius);
  const circumference = radius * 2 * PI;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={bg}
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={fg}
        r={radius}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ strokeWidth, strokeDashoffset }}
      />
    </Svg>
  );
};
