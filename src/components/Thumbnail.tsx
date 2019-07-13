import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import StyleGuide from "./StyleGuide";

const styles = StyleSheet.create({
  container: {
    margin: StyleGuide.spacing,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 150,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 2
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    width: undefined,
    height: undefined,
    resizeMode: "cover"
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: StyleGuide.spacing,
    justifyContent: "flex-end"
  },
  title: {
    ...StyleGuide.typography.title2
  }
});

interface ThumbnailProps {
  title: string;
  source: number;
}

export default ({ title, source }: ThumbnailProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} {...{ source }} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};
