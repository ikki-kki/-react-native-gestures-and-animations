import * as React from "react";
import { View, StyleSheet, Image, ViewStyle } from "react-native";
import StyleGuide from "./StyleGuide";

type CardId = "1" | "2" | "3";
interface Card {
  id: CardId;
  source: number;
}

export const cards: Card[] = [
  {
    id: "1",
    source: require("../../assets/examples/card1.png")
  },
  {
    id: "2",
    source: require("../../assets/examples/card2.png")
  },
  {
    id: "3",
    source: require("../../assets/examples/card3.png")
  }
];

const CARD_ASPECT_RATIO = 1324 / 863;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: CARD_ASPECT_RATIO
  },
  image: {
    position: "absolute",
    top: StyleGuide.spacing,
    left: StyleGuide.spacing,
    right: StyleGuide.spacing,
    bottom: StyleGuide.spacing,
    borderRadius: 18,
    width: undefined,
    height: undefined
  }
});

interface CardProps {
  card: Card;
  style?: ViewStyle;
}

export default ({ card, style }: CardProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} source={card.source} />
    </View>
  );
};
