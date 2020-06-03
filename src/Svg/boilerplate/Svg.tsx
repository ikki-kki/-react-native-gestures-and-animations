import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Constants from "expo-constants";

import { StyleGuide } from "../../components";

const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const center = {
  x: containerWidth / 2,
  y: containerHeight / 2,
};
const radius = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const SvgAnimation = () => {
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Ellipse
          cx={center.x}
          cy={center.y}
          rx={radius}
          ry={radius}
          fill={StyleGuide.palette.primary}
        />
      </Svg>
    </View>
  );
};

export default SvgAnimation;
