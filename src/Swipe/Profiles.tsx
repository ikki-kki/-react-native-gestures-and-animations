import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";

import { useMemoOne } from "use-memo-one";
import { RectButton } from "react-native-gesture-handler";
import Card, { Profile } from "./Profile";
import Swipeable from "./Swipeable";
import { StyleGuide, timing } from "../components";

const {
  Value,
  Clock,
  interpolate,
  concat,
  Extrapolate,
  block,
  cond,
  set,
  useCode,
  not,
  clockRunning,
  call
} = Animated;
const { width, height } = Dimensions.get("window");
const deltaX = width / 2;
const α = Math.PI / 12;
const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
const snapPoints = [-A, 0, A];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "space-evenly"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  cards: {
    flex: 1,
    marginHorizontal: 16,
    zIndex: 100
  },
  footer: {
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
  const { x, y, offsetX, like, dislike } = useMemoOne(
    () => ({
      x: new Value(0),
      y: new Value(0),
      offsetX: new Value(0),
      like: new Value(0) as Animated.Value<0 | 1>,
      dislike: new Value(0) as Animated.Value<0 | 1>
    }),
    []
  );
  const onSnap = useMemoOne(
    () => ([point]: readonly number[]) => {
      if (point !== 0) {
        offsetX.setValue(0);
        setIndex((index + 1) % profiles.length);
      }
    },
    [index, offsetX, profiles.length]
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
  const clock = new Clock();
  useCode(
    () =>
      block([
        cond(dislike, [
          set(
            offsetX,
            timing({
              clock,
              from: offsetX,
              to: -A
            })
          ),
          cond(not(clockRunning(clock)), [set(dislike, 0), call([], onSnap)])
        ]),
        cond(like, [
          set(
            offsetX,
            timing({
              clock,
              from: offsetX,
              to: A
            })
          ),
          cond(not(clockRunning(clock)), [set(like, 0), call([], onSnap)])
        ])
      ]),
    [dislike, offsetX, clock, onSnap, like]
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View>
      <View style={styles.cards}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ translateX }, { translateY }, { rotateZ }]
          }}
        >
          <Card {...{ profile, likeOpacity, nopeOpacity }} />
        </Animated.View>
        <Swipeable key={index} {...{ snapPoints, onSnap, x, y, offsetX }} />
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.circle} onPress={() => dislike.setValue(1)}>
          <Icon name="x" size={32} color="#ec5288" />
        </RectButton>
        <RectButton style={styles.circle} onPress={() => like.setValue(1)}>
          <Icon name="heart" size={32} color="#6ee3b4" />
        </RectButton>
      </View>
    </SafeAreaView>
  );
};
