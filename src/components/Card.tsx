import * as React from "react";
import { StyleSheet, Image, ImageStyle, Dimensions } from "react-native";
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
export const CARD_WIDTH = width - StyleGuide.spacing * 8;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18
  },
  flexibleContainer: {
    flex: 1,
    maxWidth: "100%",
    aspectRatio: CARD_ASPECT_RATIO,
    margin: StyleGuide.spacing,
    borderRadius: 18,
    resizeMode: "contain"
  }
});

interface CardProps {
  card: Card;
}

interface FlexibleCardProps extends CardProps {
  style?: ImageStyle;
}

export const FlexibleCard = ({ card, style }: FlexibleCardProps) => (
  <Image style={[styles.flexibleContainer, style]} source={card.source} />
);

export default ({ card }: CardProps) => {
  return <Image style={styles.container} source={card.source} />;
};
