import Color from "color";
import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";

import { bInterpolate } from "react-native-redash";
import StyleGuide from "./StyleGuide";
import Text from "./Text";
import TapHandler from "./TapHandler";

const { Value } = Animated;
const background = new Color(StyleGuide.palette.backgroundPrimary);
const styles = StyleSheet.create({
  container: {
    margin: StyleGuide.spacing * 2,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 150,
    overflow: "hidden",
    backgroundColor: StyleGuide.palette.backgroundPrimary
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    width: undefined,
    height: undefined,
    transform: [{ scale: 1 }]
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: StyleGuide.spacing,
    justifyContent: "flex-end"
  }
});

interface ThumbnailProps {
  title: string;
  source: number;
  onPress: () => void;
  contrast?: boolean;
}

export default ({ title, source, onPress, contrast }: ThumbnailProps) => {
  const value = new Value(0);
  const scale = bInterpolate(value, 1, 1.5);
  return (
    <TapHandler {...{ onPress, value }}>
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.image,
            {
              resizeMode: contrast ? "cover" : "contain",
              transform: [{ scale }]
            }
          ]}
          {...{ source }}
        />
        {!contrast && (
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={[
              `rgba(${background.array().join(", ")}, 0)`,
              `rgba(${background.array().join(", ")}, 0.9)`,
              `rgba(${background.array().join(", ")}, 1)`
            ]}
            locations={[0.7, 0.8, 1]}
          />
        )}
        <View style={styles.content}>
          <Text type="title2" style={{ color: contrast ? "white" : "#2F2E41" }}>
            {title}
          </Text>
        </View>
      </View>
    </TapHandler>
  );
};
