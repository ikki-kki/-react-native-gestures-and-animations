import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import StyleGuide from "./StyleGuide";

export const MIN_HEADER_HEIGHT = 64 + Constants.statusBarHeight;
export const MAX_HEADER_HEIGHT = 64;
const styles = StyleSheet.create({
  container: {
    height: MAX_HEADER_HEIGHT,
    backgroundColor: StyleGuide.palette.primary,
    padding: StyleGuide.spacing
  },
  title: {
    ...StyleGuide.typography.title1,
    color: "white"
  }
});

interface HeaderProps {
  title: string;
}

export default ({ title }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
