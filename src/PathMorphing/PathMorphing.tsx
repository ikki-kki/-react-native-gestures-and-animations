import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { interpolateColor } from "./AnimationHelpers";

import Eye from "./Eye";
import Mouth from "./Mouth";
import Slider from "./Slider";

const { Value } = Animated;
const styles = StyleSheet.create({
  face: {
    width: 150,
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const bad = {
  r: 0.9921568627 * 255,
  g: 0.7450980392 * 255,
  b: 0.9215686275 * 255
};

const normal = {
  r: 0.9921568627 * 255,
  g: 0.9333333333 * 255,
  b: 0.7450980392 * 255
};

const good = {
  r: 0.7450980392 * 255,
  g: 0.9921568627 * 255,
  b: 0.8980392157 * 255
};

export default () => {
  const state = new Value(State.UNDETERMINED);
  const progress = new Value(1);
  const backgroundColor = interpolateColor(progress, {
    inputRange: [0, 0.5, 1] as const,
    outputRange: [bad, normal, good]
  });
  return (
    <Animated.View
      style={{ flex: 1, backgroundColor, justifyContent: "center" }}
    >
      <View style={styles.face}>
        <View style={styles.eyes}>
          <Eye {...{ state, progress }} />
          <Eye flip {...{ state, progress }} />
        </View>
        <Mouth {...{ progress }} />
      </View>
      <Slider {...{ state, progress }} />
    </Animated.View>
  );
};
