import React from "react";
import { StyleSheet, View } from "react-native";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import { StyleGuide } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

const Timing = () => {
  return (
    <View style={styles.container}>
      <SimpleActivityIndicator />
    </View>
  );
};

export default Timing;
