import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition, bInterpolate } from "react-native-redash";

import { Card, Button, StyleGuide, cards } from "../components";

const { multiply } = Animated;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4
  }
});

export default () => {
  const [toggled, setToggle] = useState(false);
  const transitionVal = useTransition(
    toggled,
    toggled ? 0 : 1,
    toggled ? 1 : 0,
    400,
    Easing.inOut(Easing.ease)
  );
  const rotate = bInterpolate(transitionVal, 0, Math.PI / 6);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Animated.View
          key={card.id}
          style={[
            styles.overlay,
            { transform: [{ rotate: multiply(rotate, index) }] }
          ]}
        >
          <Card {...{ card }} />
        </Animated.View>
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle(!toggled)}
      />
    </View>
  );
};
