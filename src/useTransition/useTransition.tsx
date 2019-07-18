import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, StyleGuide, cards } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(100, 200, 300, 0.5)"
  }
});
export default () => {
  return (
    <View style={styles.container}>
      {cards.map(card => (
        <View key={card.id} style={styles.overlay}>
          <Card {...{ card }} />
        </View>
      ))}
    </View>
  );
};
