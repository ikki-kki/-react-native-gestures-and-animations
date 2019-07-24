import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { LoadAssets, StyleGuide, cards } from "./src/components";
import Examples, { examples } from "./src/Examples";
import Transitions from "./src/Transitions";
import UseTransition from "./src/UseTransition";
import Timing from "./src/Timing";
import DarkMode, { profilePic } from "./src/DarkMode";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};

const assets = [
  ...examples.map(example => example.source),
  ...cards.map(card => card.source),
  profilePic
];

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
      Transitions: {
        screen: Transitions,
        navigationOptions: {
          title: "Transitions"
        }
      },
      useTransition: {
        screen: UseTransition,
        navigationOptions: {
          title: "useTransition()"
        }
      },
      DarkMode: {
        screen: DarkMode,
        navigationOptions: {
          title: "Dark Mode"
        }
      },
      Timing: {
        screen: Timing,
        navigationOptions: {
          title: "Timing"
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
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);
