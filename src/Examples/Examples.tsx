import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { NavigationScreenConfigProps } from "react-navigation";
import { StyleGuide, Thumbnail } from "../components";

export const examples = [
  {
    screen: "ClockValuesAndIdentities",
    title: "Clock Values & Identities",
    source: require("../../assets/examples/clock-values-and-identities.png")
  },
  {
    screen: "Transitions",
    title: "Transitions",
    source: require("../../assets/examples/transitions.png")
  },
  {
    screen: "useTransition",
    title: "useTransition()",
    source: require("../../assets/examples/useTransition.png")
  },
  {
    screen: "DarkMode",
    title: "Dark Mode",
    source: require("../../assets/examples/dark-mode.png"),
    resizeMode: "cover" as "cover",
    dark: true
  },
  {
    screen: "Timing",
    title: "Timing",
    source: require("../../assets/examples/timing.png")
  },
  {
    screen: "PanGesture",
    title: "Pan Gesture",
    source: require("../../assets/examples/pan-gesture.png")
  },
  {
    screen: "Decay",
    title: "Decay",
    source: require("../../assets/examples/decay.png")
  },
  {
    screen: "Spring",
    title: "Spring",
    source: require("../../assets/examples/spring.png")
  },
  {
    screen: "Swipe",
    title: "Swipe",
    source: require("../../assets/examples/swipe.png")
  },
  {
    screen: "DynamicSpring",
    title: "Dynamic Spring",
    source: require("../../assets/examples/dynamic-spring.png")
  },
  {
    screen: "DragToSort",
    title: "Drag to Sort",
    source: require("../../assets/examples/drag-to-sort.png")
  },
  {
    screen: "Svg",
    title: "Svg",
    source: require("../../assets/examples/svg2.png")
  },
  {
    screen: "Trigonometry",
    title: "Trigonometry",
    source: require("../../assets/examples/trigonometry.png")
  },
  {
    screen: "CircularSlider",
    title: "Circular Slider",
    source: require("../../assets/examples/circular-progress.png")
  },
  {
    screen: "BezierCurves",
    title: "Bezier Curves",
    source: require("../../assets/examples/bezier-curves.png")
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background
  },
  content: {
    paddingBottom: 32
  }
});

export default ({ navigation }: NavigationScreenConfigProps) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map(thumbnail => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigation.navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};
