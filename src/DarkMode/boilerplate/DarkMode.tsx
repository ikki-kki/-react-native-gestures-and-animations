import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { Button, Text } from "../../components";

import ProfilePic from "./ProfilePic";
import SocialMediaIcons from "./SocialMediaIcons";
import Followers from "./Followers";

export { profilePic } from "./ProfilePic";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
  },
});

const DarkMode = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
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
      <Button label="Follow" primary onPress={() => null} />
    </View>
  );
};

export default DarkMode;
