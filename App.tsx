import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { LoadAssets, StyleGuide } from "./src/components";
import Examples, { examples } from "./src/examples";
import Layouts from "./src/layouts";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};
const assets = examples.map(example => example.source);
const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Examples: {
        screen: Examples,
        navigationOptions: {
          title: "Gestures & Animations",
          headerBackTitle: null
        }
      },
      Layouts: {
        screen: Layouts,
        navigationOptions: {
          title: "Layouts"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0
        },
        headerTintColor: "white"
      }
    }
  )
);

export default () => (
  <LoadAssets {...{ fonts, assets }}>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
  </LoadAssets>
);
