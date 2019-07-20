import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { StyleGuide } from "../components";

interface SimpleActivityIndicatorProps {
  progress: Animated.Value<number>;
}

const { interpolate, Extrapolate } = Animated;
const size = 32;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  bubble: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: StyleGuide.palette.primary
  }
});

export default ({ progress }: SimpleActivityIndicatorProps) => {
  const bubbles = 3;
  const delta = 1 / bubbles;
  return (
    <View style={styles.container}>
      {new Array(bubbles)
        .fill(0)
        .map((_, i) => i)
        .map(i => {
          const start = i * delta;
          const end = start + delta;
          const opacity = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [0.5, 1],
            extrapolate: Extrapolate.CLAMP
          });
          const scale = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [1, 1.5],
            extrapolate: Extrapolate.CLAMP
          });
          return (
            <Animated.View
              key={i}
              style={[styles.bubble, { opacity, transform: [{ scale }] }]}
            />
          );
        })}
    </View>
  );
};
