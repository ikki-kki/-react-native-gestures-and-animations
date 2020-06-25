import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import StyleGuide from "./StyleGuide";
import CheckIcon, { CHECK_ICON_SIZE } from "./CheckIcon";

const styles = StyleSheet.create({
  buttonContainer: {
    borderBottomWidth: 1,
    borderColor: "#f4f6f3",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: StyleGuide.spacing * 2 + CHECK_ICON_SIZE,
    padding: StyleGuide.spacing,
  },
});

interface SelectionProps {
  name: string;
  onPress: () => void;
  isSelected: boolean;
}

const Selection = ({ name, onPress, isSelected }: SelectionProps) => {
  return (
    <SafeAreaView style={styles.buttonContainer}>
      <RectButton {...{ onPress }}>
        <View style={styles.button} accessible>
          <Text>{name}</Text>
          {isSelected && <CheckIcon />}
        </View>
      </RectButton>
    </SafeAreaView>
  );
};

export default Selection;
