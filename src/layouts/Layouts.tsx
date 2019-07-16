import React, { useState } from "react";
import { View, StyleSheet, ViewStyle, SafeAreaView, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Card, StyleGuide, cards } from "../components";

import CheckIcon from "./CheckIcon";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  },
  button: {
    flexDirection: "row"
  },
  name: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f6f3",
    justifyContent: "center"
  }
});

interface Layout {
  container: ViewStyle;
  child: ViewStyle;
}

const column: Layout = {
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  child: {}
};

const row: Layout = {
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  child: {}
};

const wrap: Layout = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  child: {
    flex: 2
  }
};

const stacked: Layout = {
  container: {},
  child: {}
};

const layouts = [
  {
    id: "column",
    name: "Column",
    layout: column,
    color: "blue"
  },
  {
    id: "row",
    name: "Row",
    layout: row,
    color: "blue"
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: wrap,
    color: "blue"
  },
  {
    id: "stacked",
    name: "stacked",
    layout: stacked,
    color: "blue"
  }
];

const stack: Layout = {
  container: {},
  child: {
    ...StyleSheet.absoluteFillObject
  }
};

export default () => {
  const [selectedLayout, setLayout] = useState(stack);
  return (
    <>
      <View style={[styles.container, selectedLayout.container]}>
        {cards.map(card => (
          <Card key={card.id} style={selectedLayout.child} {...{ card }} />
        ))}
      </View>
      <SafeAreaView>
        {layouts.map(({ id, name, layout, color }, index) => (
          <RectButton key={id} onPress={() => setLayout(layout)}>
            <View style={styles.button} accessible>
              <View style={styles.name}>
                <Text>{name}</Text>
              </View>
              {selectedLayout === layout && <CheckIcon {...{ color }} />}
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </>
  );
};
