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

const styles = StyleSheet.create({
  container: {
    margin: StyleGuide.spacing * 2,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 150,
    elevation: 5,
    overflow: "hidden",
    backgroundColor: "#dae2f0"
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
    ...StyleSheet.absoluteFillObject,
    padding: StyleGuide.spacing,
    justifyContent: "flex-end"
  },
  title: {
    ...StyleGuide.typography.title2,
    color: "black"
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
            "rgba(218, 226, 240, 0)",
            "rgba(218, 226, 240, 0.9)",
            "rgba(218, 226, 240, 1)"
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
