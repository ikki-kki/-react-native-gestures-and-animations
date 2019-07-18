import * as React from "react";
import { View, StyleSheet } from "react-native";

import { Text, StyleGuide } from "../components";

interface FollowersProps {
  followers: number;
  following: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  separator: {
    backgroundColor: StyleGuide.palette.border,
    width: 1,
    height: "100%"
  }
});

export default ({ followers, following }: FollowersProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text type="body">{`${followers}`}</Text>
        <Text>Followers</Text>
      </View>
      <View style={styles.separator} />
      <View>
        <Text type="body">{`${following}`}</Text>
        <Text>Following</Text>
      </View>
    </View>
  );
};
