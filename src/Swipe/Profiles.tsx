import React, { useState, useMemo } from "react";
import { View, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";

import { useMemoOne } from "use-memo-one";
import Card, { Profile } from "./Profile";
import Swipeable from "./Swipeable";

const { Value, interpolate, concat, Extrapolate } = Animated;
const { width, height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);
const snapPoints = [-A, 0, A];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
    justifyContent: "space-evenly"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  cards: {
    width: w,
    height: h,
    marginLeft: 16
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2
  }
});

interface ProfilesProps {
  profiles: Profile[];
}

export default ({ profiles }: ProfilesProps) => {
  const [index, setIndex] = useState(0);
  const { x, y } = useMemoOne(
    () => ({
      x: new Value(0),
      y: new Value(0)
    }),
    []
  );
  const onSnap = useMemo(
    () => ([point]: [number]) => {
      if (point !== 0) {
        setIndex((index + 1) % profiles.length);
      }
    },
    [index, profiles.length]
  );
  const profile = profiles[index];
  const rotateZ = concat(
    interpolate(x, {
      inputRange: [-1 * deltaX, deltaX],
      outputRange: [α, -1 * α],
      extrapolate: Extrapolate.CLAMP
    }),
    "rad"
  );
  const likeOpacity = interpolate(x, {
    inputRange: [0, deltaX / 4],
    outputRange: [0, 1]
  });
  const nopeOpacity = interpolate(x, {
    inputRange: [(-1 * deltaX) / 4, 0],
    outputRange: [1, 0]
  });
  const translateX = x;
  const translateY = y;
  const style = {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateX }, { translateY }, { rotateZ }]
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View>
      <View style={styles.cards}>
        <Animated.View {...{ style }}>
          <Card {...{ profile, likeOpacity, nopeOpacity }} />
        </Animated.View>
        <Swipeable key={index} {...{ snapPoints, onSnap, x, y }} />
      </View>
      <View style={styles.footer}>
        <View style={styles.circle}>
          <Icon name="x" size={32} color="#ec5288" />
        </View>
        <View style={styles.circle}>
          <Icon name="heart" size={32} color="#6ee3b4" />
        </View>
      </View>
    </SafeAreaView>
  );
};
