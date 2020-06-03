import React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import Card, {
  CardProps,
  CARD_HEIGHT as INNER_CARD_HEIGHT,
} from "../../components/Card";

export const CARD_HEIGHT = INNER_CARD_HEIGHT + 32;
const { width } = Dimensions.get("window");

interface SortableCardProps extends CardProps {
  // offsets: Animated.Value<number>[];
  index: number;
}

const SortableCard = ({ card }: SortableCardProps) => {
  return (
    <PanGestureHandler>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: CARD_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card {...{ card }} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SortableCard;
