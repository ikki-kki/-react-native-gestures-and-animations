import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { NavigationScreenConfigProps } from "react-navigation";
import { Thumbnail, StyleGuide } from "../components";

export const examples = [
  {
    screen: "Layouts",
    title: "Layouts",
    source: require("../../assets/examples/layouts.png")
  },
  {
    screen: "Transitions",
    title: "Transitions",
    source: require("../../assets/examples/transitions.png")
  },
  {
    screen: "UseTransition",
    title: "Trigonometry",
    source: require("../../assets/examples/advanced-transitions.png")
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background
  }
});

export default ({ navigation }: NavigationScreenConfigProps) => {
  return (
    <ScrollView style={styles.container}>
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
