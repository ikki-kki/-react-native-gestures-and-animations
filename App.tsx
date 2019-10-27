import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { LoadAssets, StyleGuide, cards } from "./src/components";
import Examples, { examples } from "./src/Examples";
import Transitions from "./src/Transitions";
import UseTransition from "./src/UseTransition";
import Timing from "./src/Timing";
import DarkMode, { profilePic } from "./src/DarkMode";
import PanGesture from "./src/PanGesture";
import Decay from "./src/Decay";
import Spring from "./src/Spring";
import DynamicSpring from "./src/DynamicSpring";
import DragToSort from "./src/DragToSort";
import Swipe, { profiles } from "./src/Swipe";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};

const assets = [
  ...examples.map(example => example.source),
  ...cards.map(card => card.source),
  ...profiles.map(profile => profile.profile),
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
      },
      PanGesture: {
        screen: PanGesture,
        navigationOptions: {
          title: "Pan Gesture"
        }
      },
      Decay: {
        screen: Decay,
        navigationOptions: {
          title: "Decay"
        }
      },
      Spring: {
        screen: Spring,
        navigationOptions: {
          title: "Spring"
        }
      },
      Swipe: {
        screen: Swipe,
        navigationOptions: {
          title: "Swipe"
        }
      },
      DynamicSpring: {
        screen: DynamicSpring,
        navigationOptions: {
          title: "Dynamic Spring"
        }
      },
      DragToSort: {
        screen: DragToSort,
        navigationOptions: {
          title: "Drag to Sort"
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
