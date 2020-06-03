import React from "react";
import { StyleSheet, View } from "react-native";

import { FlexibleCard as Card, StyleGuide, cards } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
  },
});

const Transitions = () => {
  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <Card key={card.id} style={{}} {...{ card }} />
      ))}
    </View>
  );
};

export default Transitions;
