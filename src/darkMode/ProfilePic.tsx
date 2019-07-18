import * as React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const size = width / 2;
const styles = StyleSheet.create({
  image: {
    width: size,
    height: size,
    borderRadius: size / 2,
    resizeMode: "cover"
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
