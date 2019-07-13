import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Thumbnail } from "../components";

export const examples = [
  {
    id: "layouts",
    title: "Layouts",
    source: require("../../assets/examples/layouts.png")
  },
  {
    id: "transitions",
    title: "Transitions",
    source: require("../../assets/examples/transitions.png")
  }
];
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9f1ff"
  }
});

export default () => {
  return (
    <ScrollView style={styles.container}>
      {examples.map(thumbnail => (
        <Thumbnail key={thumbnail.id} {...thumbnail} />
      ))}
    </ScrollView>
  );
};
