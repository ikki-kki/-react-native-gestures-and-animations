import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import { Button, Text } from "../components";

import Switch from "./Switch";
import ProfilePic from "./ProfilePic";
import SocialMediaIcons from "./SocialMediaIcons";
import Followers from "./Followers";

export { profilePic } from "./ProfilePic";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Out type="fade" durationMs={500} />
  </Transition.Together>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  darkMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black"
  },
  text: {
    textAlign: "center"
  }
});

export default () => {
  const [dark, setDark] = useState(false);
  const ref = useRef<TransitioningView>(null);
  return (
    <Transitioning.View style={styles.container} {...{ ref, transition }}>
      {dark && <View style={styles.darkMask} />}
      <Switch
        value={dark}
        onValueChange={value => {
          if (ref.current) {
            ref.current.animateNextTransition();
          }
          setDark(value);
        }}
      />
      <ProfilePic />
      <View>
        <Text type="title3" style={styles.text} {...{ dark }}>
          Krzysztof Magiera
        </Text>
        <Text type="headline" style={styles.text} {...{ dark }}>
          Kraków, Poland
        </Text>
      </View>
      <Followers followers={3569} following={310} {...{ dark }} />
      <SocialMediaIcons />
      <Text type="body" style={styles.text} {...{ dark }}>
        When speaking of animations, the key to success is to avoid frame drops
      </Text>
      <Button label="Follow" primary onPress={() => true} />
    </Transitioning.View>
  );
};
