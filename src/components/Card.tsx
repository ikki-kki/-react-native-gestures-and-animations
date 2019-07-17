import * as React from "react";
import { StyleSheet, Image, ImageStyle } from "react-native";
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
    margin: StyleGuide.spacing,
    aspectRatio: CARD_ASPECT_RATIO,
    borderRadius: 18,
    resizeMode: "contain"
  }
});

interface CardProps {
  card: Card;
  style?: ImageStyle;
}

export default ({ card, style }: CardProps) => {
  return <Image style={[styles.container, style]} source={card.source} />;
};
