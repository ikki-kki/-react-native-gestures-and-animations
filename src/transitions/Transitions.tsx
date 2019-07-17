import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  Text,
  Dimensions,
  ImageStyle
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";

import { Card, StyleGuide, Selection, cards } from "../components";

import CheckIcon, { CHECK_ICON_SIZE } from "./CheckIcon";

const { width } = Dimensions.get("window");
const transition = (
  <Transition.Change interpolation="easeInOut" durationMs={400} />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  }
});

interface Layout {
  container: ViewStyle;
  child?: ImageStyle;
}

const column: Layout = {
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

const row: Layout = {
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
};

const wrap: Layout = {
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  child: {
    flex: 0,
    width: width / 2 - StyleGuide.spacing * 2
  }
};

const layouts = [
  {
    id: "column",
    name: "Column",
    layout: column
  },
  {
    id: "row",
    name: "Row",
    layout: row
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: wrap
  }
];

export default () => {
  const ref = useRef<TransitioningView>(null);
  const [selectedLayout, setLayout] = useState(column);
  return (
    <>
      <Transitioning.View
        style={[styles.container, selectedLayout.container]}
        {...{ transition, ref }}
      >
        {cards.map(card => (
          <Card key={card.id} style={selectedLayout.child} {...{ card }} />
        ))}
      </Transitioning.View>
      {layouts.map(({ id, name, layout }) => (
        <Selection
          key={id}
          onPress={() => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            setLayout(layout);
          }}
          isSelected={selectedLayout === layout}
          {...{ name }}
        />
      ))}
    </>
  );
};
