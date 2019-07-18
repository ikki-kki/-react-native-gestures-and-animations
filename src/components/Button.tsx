import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import StyleGuide from "./StyleGuide";

interface ButtonProps {
  label: string;
  primary?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: StyleGuide.spacing
  },
  label: {
    ...StyleGuide.typography.callout,
    textAlign: "center"
  }
});

export default ({ label, primary, onPress }: ButtonProps) => {
  const color = primary ? "white" : undefined;
  const backgroundColor = primary ? StyleGuide.palette.primary : undefined;
  return (
    <RectButton {...{ onPress }}>
      <SafeAreaView style={{ backgroundColor }} accessible>
        <View style={styles.container}>
          <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
        </View>
      </SafeAreaView>
    </RectButton>
  );
};
