import React, { useState, useRef } from "react";
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

const transition = (
  <Transition.Change interpolation="easeInOut" durationMs={4000} />
);
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  text: {
    textAlign: "center"
  }
});

export default () => {
  const [dark, setDark] = useState(false);
  const ref = useRef<TransitioningView>(null);
  return (
    <Transitioning.View style={styles.root} {...{ ref, transition }}>
      <View
        style={[
          styles.container,
          { backgroundColor: dark ? "black" : "white" }
        ]}
      >
        <Switch
          value={dark}
          onValueChange={value => {
            if (ref.current) {
              console.log("animateNextTransition");
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
          When speaking of animations, the key to success is to avoid frame
          drops
        </Text>
        <Button label="Follow" primary onPress={() => {}} />
      </View>
    </Transitioning.View>
  );
};
