import * as React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent, decay, clamp } from "react-native-redash";
import { cards, StyleGuide } from "../components";

const { Value } = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const CARD_ASPECT_RATIO = 1324 / 863;
const cardWidth = width - StyleGuide.spacing * 8;
const cardHeight = cardWidth / CARD_ASPECT_RATIO;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  },
  card: {
    width: cardWidth,
    height: cardHeight
  }
});
const [card] = cards;

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY
  });
  const translateX = clamp(
    decay(translationX, state, velocityX),
    0,
    containerWidth - cardWidth
  );
  const translateY = clamp(
    decay(translationY, state, velocityY),
    0,
    containerHeight - cardHeight
  );
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
