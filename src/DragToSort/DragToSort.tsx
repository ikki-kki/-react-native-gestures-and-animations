import React, { useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import { cards } from "../components";
import SortableCard from "./SortableCard";

const { Value } = Animated;
export default () => {
  const [height, setHeight] = useState(0);
  const { offsets } = useMemoOne(
    () => ({
      offsets: cards.map((_, i) => new Value(i * height))
    }),
    [height]
  );
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={({
        nativeEvent: {
          layout: { height: h }
        }
      }) => setHeight(h / cards.length)}
    >
      {height !== 0 &&
        cards.map((card, index) => (
          <SortableCard key={card.id} {...{ offsets, card, height, index }} />
        ))}
    </View>
  );
};
