import React from "react";
import { View } from "react-native";
import { cards } from "../../components";
import SortableCard from "./SortableCard";

const DragToSort = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {cards.map((card, index) => (
        <SortableCard key={card.id} {...{ card, index }} />
      ))}
    </View>
  );
};

export default DragToSort;
