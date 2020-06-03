import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Button, Card, cards } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

const UseTransition = () => {
  return (
    <View style={styles.container}>
      {cards.map((card) => {
        return (
          <Animated.View key={card.id}>
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button label="Start" primary onPress={() => true} />
    </View>
  );
};

export default UseTransition;
