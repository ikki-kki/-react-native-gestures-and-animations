import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { LoadAssets, StyleGuide } from "./src/components";
import Examples from "./src/examples";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};
const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Examples: {
        screen: Examples,
        navigationOptions: () => ({
          title: "Examples",
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: StyleGuide.palette.primary,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: "white"
          }
        })
      }
    },
    {}
  )
);

export default () => (
  <LoadAssets {...{ fonts }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);
