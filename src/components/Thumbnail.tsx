import Color from "color";
import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StyleGuide from "./StyleGuide";

const background = new Color(StyleGuide.palette.backgroundPrimary);
const styles = StyleSheet.create({
  container: {
    margin: StyleGuide.spacing * 2,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 150,
    elevation: 5,
    overflow: "hidden",
    backgroundColor: StyleGuide.palette.backgroundPrimary
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
    transform: [{ scale: 1 }]
  },
  content: {
    padding: StyleGuide.spacing,
    justifyContent: "flex-end"
  },
  title: {
    ...StyleGuide.typography.title2,
    color: "#2F2E41"
  }
});

interface ThumbnailProps {
  title: string;
  source: number;
  onPress: () => void;
}

export default ({ title, source, onPress }: ThumbnailProps) => {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View style={styles.container}>
        <Image style={styles.image} {...{ source }} />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            `rgba(${background.array().join(", ")}, 0)`,
            `rgba(${background.array().join(", ")}, 0.9)`,
            `rgba(${background.array().join(", ")}, 1)`
          ]}
          locations={[0.7, 0.8, 1]}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
