import React, { useState, useRef } from "react";
import { StyleSheet, ViewStyle, Dimensions, ImageStyle } from "react-native";
import {
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";

import { FlexibleCard, StyleGuide, Selection, cards } from "../components";

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}
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
const layouts: Layout[] = [
  {
    id: "column",
    name: "Column",
    layout: {
      container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  },
  {
    id: "row",
    name: "Row",
    layout: {
      container: {
        flexDirection: "row",
        alignItems: "center"
      }
    }
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: {
      container: {
        flexDirection: "row",
        flexWrap: "wrap"
      },
      child: {
        flex: 0,
        width: width / 2 - StyleGuide.spacing * 2
      }
    }
  }
];

export default () => {
  const ref = useRef<TransitioningView>(null);
  const [selectedLayout, setLayout] = useState(layouts[0].layout);
  return (
    <>
      <Transitioning.View
        style={[styles.container, selectedLayout.container]}
        {...{ transition, ref }}
      >
        {cards.map(card => (
          <FlexibleCard
            key={card.id}
            style={selectedLayout.child}
            {...{ card }}
          />
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
