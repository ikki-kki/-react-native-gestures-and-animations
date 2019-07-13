import * as React from "react";
import { View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
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
    resizeMode: "center"
  }
});

interface ThumbnailProps {
  title: string;
  source: number;
}

export default ({ title, source }: ThumbnailProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://stubborn.rocks/images/scenes/group-401@2x.png"
        }}
        style={styles.image}
      />
    </View>
  );
};
