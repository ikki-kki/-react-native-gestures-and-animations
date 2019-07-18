import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  useTransition,
  bInterpolate,
  transformOrigin
} from "react-native-redash";

import { Card, Button, StyleGuide, cards } from "../components";

const { multiply, interpolate } = Animated;
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

export default () => {
  const [toggled, setToggle] = useState(false);
  const transitionVal = useTransition(
    toggled,
    toggled ? 0 : 1,
    toggled ? 1 : 0,
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
                    translateX: -width / 2
                  },
                  {
                    rotate
                  },
                  {
                    translateX: width / 2
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
