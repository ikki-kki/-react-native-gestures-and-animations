import * as React from "react";
import { StyleSheet, View } from "react-native";
// import Constants from "expo-constants";

import { Card, StyleGuide, cards } from "../../components";

// const { width, height } = Dimensions.get("window");
// const containerWidth = width;
// const containerHeight = height - Constants.statusBarHeight - 44;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
});
const [card] = cards;

const PanGesture = () => {
  return (
    <View style={styles.container}>
      <View>
        <Card {...{ card }} />
      </View>
    </View>
  );
};

export default PanGesture;
