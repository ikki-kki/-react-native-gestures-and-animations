import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  TransitioningView,
  Transitioning,
  Transition
} from "react-native-reanimated";
import { Card, Button, StyleGuide, cards } from "../components";

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
  const ref = useRef<TransitioningView>(null);
  const [toggled, setToggle] = useState(false);
  const rotate = toggled ? Math.PI / 6 : 0;
  return (
    <Transitioning.View
      style={styles.container}
      transition={
        <Transition.Change interpolation="easeInOut" durationMs={400} />
      }
      {...{ ref }}
    >
      {cards.map((card, index) => (
        <View
          key={card.id}
          style={[
            styles.overlay,
            { transform: [{ rotate: `${rotate * index}rad` }] }
          ]}
        >
          <Card {...{ card }} />
        </View>
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition();
          }
          setToggle(!toggled);
        }}
      />
    </Transitioning.View>
  );
};
