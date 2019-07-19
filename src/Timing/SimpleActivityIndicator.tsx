import * as React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

interface SimpleActivityIndicatorProps {
  progress: Animated.Value<number>;
}

export default ({ progress }: SimpleActivityIndicatorProps) => {
  return <View />;
};
