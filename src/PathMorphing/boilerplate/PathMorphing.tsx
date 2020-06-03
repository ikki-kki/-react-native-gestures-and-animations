import React from "react";
import { StyleSheet, View } from "react-native";
import Eye from "./Eye";
import Mouth from "./Mouth";
import Slider from "./Slider";

const styles = StyleSheet.create({
  face: {
    width: 150,
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// const bad = "#FDBEEB";
// const normal = "#FDEEBE";
const good = "#BEFDE5";

const PathMorphing = () => {
  return (
    <View style={{ flex: 1, backgroundColor: good, justifyContent: "center" }}>
      <View style={styles.face}>
        <View style={styles.eyes}>
          <Eye />
          <Eye flip />
        </View>
        <Mouth />
      </View>
      <Slider />
    </View>
  );
};

export default PathMorphing;
