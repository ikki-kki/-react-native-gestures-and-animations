import * as React from "react";
import { StyleSheet, View } from "react-native";

import Text from "./Text";

interface FollowersProps {
  followers: number;
  following: number;
  dark?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  separator: {
    width: 1,
    height: "100%"
  }
});

export default ({ dark, followers, following }: FollowersProps) => {
  const backgroundColor = dark ? "white" : "black";
  return (
    <View style={styles.container}>
      <View>
        <Text type="body" {...{ dark }}>{`${followers}`}</Text>
        <Text {...{ dark }}>Followers</Text>
      </View>
      <View style={[styles.separator, { backgroundColor }]} />
      <View>
        <Text type="body" {...{ dark }}>{`${following}`}</Text>
        <Text {...{ dark }}>Following</Text>
      </View>
    </View>
  );
};
