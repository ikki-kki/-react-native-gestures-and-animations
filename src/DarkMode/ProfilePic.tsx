import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { StyleGuide } from "../components";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const profilePic = require("../../assets/examples/krzysztof.jpg");

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
  return <Image style={styles.image} source={profilePic} />;
};
