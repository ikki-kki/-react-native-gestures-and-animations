import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import StyleGuide from "./StyleGuide";

const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
const CARD_WIDTH = width - StyleGuide.spacing * 2;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: StyleGuide.palette.primary,
    borderRadius: StyleGuide.spacing * 2
  }
});

interface CardProps {}

export default () => {
  return <View style={styles.container} />;
};
