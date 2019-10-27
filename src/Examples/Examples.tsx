import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { NavigationScreenConfigProps } from "react-navigation";
import { Thumbnail, StyleGuide } from "../components";

export const examples = [
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
    screen: "Drag to Sort",
    title: "DragToSort",
    source: require("../../assets/examples/dynamic-spring.png")
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
