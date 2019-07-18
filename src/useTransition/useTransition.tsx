import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  useTransition,
  bInterpolate,
  transformOrigin
} from "react-native-redash";

import { Card, Button, StyleGuide, cards } from "../components";

const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get("window");
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
const newOrigin = width / 2 - StyleGuide.spacing * 2;

export default () => {
  const [toggled, setToggle] = useState(0);
  const transitionVal = useTransition(
    toggled,
    not(toggled),
    toggled,
    400,
    Easing.inOut(Easing.ease)
  );

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const rotation = interpolate(index, {
          inputRange: [0, 1, 2],
          outputRange: [-1, 0, 1]
        });
        const rotate = multiply(
          rotation,
          bInterpolate(transitionVal, 0, Math.PI / 6)
        );
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,
              {
                transform: [
                  {
                    translateX: -newOrigin
                  },
                  {
                    rotate
                  },
                  {
                    translateX: newOrigin
                  }
                ]
              }
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle(!toggled)}
      />
    </View>
  );
};
