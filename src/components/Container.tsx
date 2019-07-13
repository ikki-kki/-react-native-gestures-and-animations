import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import StyleGuide from "./StyleGuide";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f1ff"
  },
  scrollView: {
    padding: StyleGuide.spacing
  }
});

interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

export default ({ children }: ContainerProps) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </View>
  );
};
