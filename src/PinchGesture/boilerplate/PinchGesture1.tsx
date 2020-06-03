import React from "react";
import { Image, StyleSheet } from "react-native";

/*
const { width, height } = Dimensions.get("window");
const CANVAS = {
  x: width,
  y: height,
};
const CENTER = {
  x: width / 2,
  y: height / 2,
};
*/
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

const PinchGesture1 = () => {
  return (
    <Image style={[styles.image]} source={require("../assets/zurich.jpg")} />
  );
};

export default PinchGesture1;
