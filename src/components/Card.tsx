import * as React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
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

const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
const CARD_WIDTH = width - StyleGuide.spacing * 2;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: StyleGuide.palette.primary,
    borderRadius: StyleGuide.spacing * 2
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  }
});

interface CardProps {
  id: CardId;
}

export default ({ id }: CardProps) => {
  const card = cards.find(c => c.id === id) as Card;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={card.source} />
    </View>
  );
};
