import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Header from "./Header";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

export default ({ title, children }: ContainerProps) => {
  return (
    <View style={styles.container}>
      <Header {...{ title }} />
      <ScrollView>{children}</ScrollView>
    </View>
  );
};
