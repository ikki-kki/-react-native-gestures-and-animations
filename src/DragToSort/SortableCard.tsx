import React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { panGestureHandler } from "react-native-redash";

import Card, {
  CardProps,
  CARD_HEIGHT as INNER_CARD_HEIGHT
} from "../components/Card";
import { withOffset, withTransition } from "../components";

export const CARD_HEIGHT = INNER_CARD_HEIGHT + 32;
const { width } = Dimensions.get("window");
const {
  Value,
  eq,
  cond,
  useCode,
  divide,
  floor,
  max,
  multiply,
  block,
  set,
  diff,
  lessThan,
  add,
  greaterThan,
  abs,
  not
} = Animated;

const isMoving = (position: Animated.Node<number>) => {
  const delta = diff(position);
  const noMovementFrames = new Value(0);
  return cond(
    lessThan(abs(delta), 1e-3),
    [
      set(noMovementFrames, add(noMovementFrames, 1)),
      not(greaterThan(noMovementFrames, 20))
    ],
    [set(noMovementFrames, 0), 1]
  );
};

interface SortableCardProps extends CardProps {
  offsets: Animated.Value<number>[];
  index: number;
}

export default ({ card, index, offsets }: SortableCardProps) => {
  const {
    gestureHandler,
    translationX,
    translationY,
    velocityY,
    velocityX,
    state
  } = panGestureHandler();
  const x = withOffset({
    offset: 0,
    value: translationX,
    state
  });
  const translateX = withTransition(x, velocityX, state);
  const y = withOffset({
    offset: offsets[index],
    value: translationY,
    state
  });
  const translateY = withTransition(y, velocityY, state);
  const zIndex = cond(
    eq(state, State.ACTIVE),
    200,
    cond(isMoving(translateY), 100, 1)
  );
  const currentIndex = max(floor(divide(y, CARD_HEIGHT)), 0);
  const currentOffset = multiply(currentIndex, CARD_HEIGHT);
  useCode(
    block([
      ...offsets.map(offset =>
        cond(eq(currentOffset, offset), [
          set(offset, offsets[index]),
          set(offsets[index], currentOffset)
        ])
      )
    ]),
    []
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: CARD_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          zIndex,
          transform: [
            { translateX },
            {
              translateY
            }
          ]
        }}
      >
        <Card {...{ card }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
