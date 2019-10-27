import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { cards } from "../components";
import SortableCard, { CARD_HEIGHT } from "./SortableCard";

const { Value } = Animated;
export default () => {
  const offsets = cards.map((_, i) => new Value(i * CARD_HEIGHT));
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {cards.map((card, index) => (
        <SortableCard key={card.id} {...{ offsets, card, index }} />
      ))}
    </View>
  );
};
