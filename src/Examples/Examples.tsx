import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { StyleGuide, Thumbnail } from "../components";
import { Lessons } from "../components/Routes";

export const examples = [
  {
    screen: "ClockValuesAndIdentities",
    title: "Clock Values & Identities",
    source: require("../../assets/examples/clock-values-and-identities.png"),
  },
  {
    screen: "Transitions",
    title: "Transitions",
    source: require("../../assets/examples/transitions.png"),
  },
  {
    screen: "useTransition",
    title: "useTransition()",
    source: require("../../assets/examples/useTransition.png"),
  },
  {
    screen: "DarkMode",
    title: "Dark Mode",
    source: require("../../assets/examples/dark-mode.png"),
    resizeMode: "cover" as "cover",
    dark: true,
  },
  {
    screen: "Timing",
    title: "Timing",
    source: require("../../assets/examples/timing.png"),
  },
  {
    screen: "PanGesture",
    title: "Pan Gesture",
    source: require("../../assets/examples/pan-gesture.png"),
  },
  {
    screen: "Decay",
    title: "Decay",
    source: require("../../assets/examples/decay.png"),
  },
  {
    screen: "Spring",
    title: "Spring",
    source: require("../../assets/examples/spring.png"),
  },
  {
    screen: "Swipe",
    title: "Swipe",
    source: require("../../assets/examples/swipe.png"),
  },
  {
    screen: "DynamicSpring",
    title: "Dynamic Spring",
    source: require("../../assets/examples/dynamic-spring.png"),
  },
  {
    screen: "DragToSort",
    title: "Drag to Sort",
    source: require("../../assets/examples/drag-to-sort.png"),
  },
  {
    screen: "Svg",
    title: "Svg",
    source: require("../../assets/examples/svg2.png"),
  },
  {
    screen: "Trigonometry",
    title: "Trigonometry",
    source: require("../../assets/examples/trigonometry.png"),
  },
  {
    screen: "CircularSlider",
    title: "Circular Slider",
    source: require("../../assets/examples/circular-progress.png"),
  },
  {
    screen: "BezierCurves",
    title: "Bezier Curves",
    source: require("../../assets/examples/bezier-curves.png"),
  },
  {
    screen: "PathMorphing",
    title: "Path Morphing",
    source: require("../../assets/examples/path-morphing.png"),
  },
  {
    screen: "PinchGesture",
    title: "Pinch Gesture",
    source: require("../../assets/examples/pinch-gesture.png"),
  },
] as const;

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
});

const Examples = () => {
  const { navigate } = useNavigation<
    StackNavigationProp<Lessons, "Examples">
  >();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail) => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};

export default Examples;
