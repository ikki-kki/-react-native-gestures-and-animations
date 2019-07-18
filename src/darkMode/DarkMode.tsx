import * as React from "react";
import { View, StyleSheet } from "react-native";

import { Text, Button } from "../components";

import ProfilePic from "./ProfilePic";
import SocialMediaIcons from "./SocialMediaIcons";
import Followers from "./Followers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  text: {
    textAlign: "center"
  }
});
// example: https://dribbble.com/shots/6726263-Profile-Page
export default () => {
  return (
    <View style={styles.container}>
      <ProfilePic />
      <View>
        <Text type="title3" style={styles.text}>
          Krzysztof Magiera
        </Text>
        <Text type="headline" style={styles.text}>
          Kraków, Poland
        </Text>
      </View>
      <Followers followers={3569} following={310} />
      <SocialMediaIcons />
      <Text type="body" style={styles.text}>
        When speaking of animations, the key to success is to avoid frame drops
      </Text>
      <Button label="Follow" primary onPress={() => {}} />
    </View>
  );
};
