import * as React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { onGestureEvent } from "react-native-redash";
import { cards, StyleGuide } from "../components";

const { Value } = Animated;
const { width: wWidth } = Dimensions.get("window");
const width = wWidth - StyleGuide.spacing * 8;
const CARD_ASPECT_RATIO = 1324 / 863;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width,
    height: width / CARD_ASPECT_RATIO
  }
});
const [card] = cards;

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationX, translationY });
  const translateX = translationX;
  const translateY = translationY;
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }]
          }}
        >
          <Image style={styles.card} source={card.source} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
