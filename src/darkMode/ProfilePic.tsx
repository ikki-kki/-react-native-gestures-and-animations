import * as React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const size = width / 2;
const styles = StyleSheet.create({
  image: {
    margin: StyleGuide.spacing * 2,
    width: size,
    height: size,
    borderRadius: size / 2,
    resizeMode: "cover",
    alignSelf: "center"
  }
});

export default () => {
  return (
    <Image
      style={styles.image}
      source={require("../../assets/examples/krzysztof.jpg")}
    />
  );
};
