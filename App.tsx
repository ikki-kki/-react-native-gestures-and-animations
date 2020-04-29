import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";

import { LoadAssets, StyleGuide, cards } from "./src/components";
import Examples, { examples } from "./src/Examples";
import ClockValuesAndIdentities from "./src/ClockValuesAndIdentities";
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
import Svg from "./src/Svg";
import Trigonometry from "./src/Trigonometry";
import CircularSlider from "./src/CircularSlider";
import BezierCurves from "./src/BezierCurves";
import PathMorphing from "./src/PathMorphing";
import PinchGesture, { pictures } from "./src/PinchGesture";
import { Lessons } from "./src/components/Routes";

enableScreens();

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const assets = [
  ...examples.map((example) => example.source),
  ...cards.map((card) => card.source),
  ...profiles.map((profile) => profile.profile),
  profilePic,
  ...pictures,
];

const Stack = createStackNavigator<Lessons>();
const AppNavigator = () => (
  <>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "Gestures & Animations",
        }}
      />
      <Stack.Screen
        name="ClockValuesAndIdentities"
        component={ClockValuesAndIdentities}
        options={{
          title: "Clock Values & Identities",
        }}
      />
      <Stack.Screen
        name="Transitions"
        component={Transitions}
        options={{
          title: "Transitions",
        }}
      />
      <Stack.Screen
        name="useTransition"
        component={UseTransition}
        options={{
          title: "useTransition()",
        }}
      />
      <Stack.Screen
        name="DarkMode"
        component={DarkMode}
        options={{
          title: "Dark Mode",
        }}
      />
      <Stack.Screen
        name="Timing"
        component={Timing}
        options={{
          title: "Timing",
        }}
      />
      <Stack.Screen
        name="PanGesture"
        component={PanGesture}
        options={{
          title: "Pan Gesture",
        }}
      />
      <Stack.Screen
        name="Spring"
        component={Spring}
        options={{
          title: "Spring",
        }}
      />
      <Stack.Screen
        name="Swipe"
        component={Swipe}
        options={{
          title: "Swipe",
        }}
      />
      <Stack.Screen
        name="DynamicSpring"
        component={DynamicSpring}
        options={{
          title: "Dynamic Spring",
        }}
      />
      <Stack.Screen
        name="DragToSort"
        component={DragToSort}
        options={{
          title: "Drag to Sort",
        }}
      />
      <Stack.Screen
        name="Svg"
        component={Svg}
        options={{
          title: "SVG",
        }}
      />
      <Stack.Screen
        name="Trigonometry"
        component={Trigonometry}
        options={{
          title: "Trigonometry",
        }}
      />
      <Stack.Screen
        name="Decay"
        component={Decay}
        options={{
          title: "Decay",
        }}
      />
      <Stack.Screen
        name="CircularSlider"
        component={CircularSlider}
        options={{
          title: "Circular Slider",
        }}
      />
      <Stack.Screen
        name="BezierCurves"
        component={BezierCurves}
        options={{
          title: "Bèzier Curves",
        }}
      />
      <Stack.Screen
        name="PathMorphing"
        component={PathMorphing}
        options={{
          title: "Path Morphing",
        }}
      />
      <Stack.Screen
        name="PinchGesture"
        component={PinchGesture}
        options={{
          title: "Pinch Gesture",
        }}
      />
    </Stack.Navigator>
  </>
);

const App = () => (
  <LoadAssets {...{ fonts, assets }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);

export default App;
