import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { NavigationScreenConfigProps } from "react-navigation";
import { Thumbnail } from "../components";

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
    title: "useTransition()",
    source: require("../../assets/examples/advanced-transitions.png")
  }
];
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d5e5ff"
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
