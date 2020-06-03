import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  useCode,
} from "react-native-reanimated";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import {
  onGestureEvent,
  pinchActive,
  pinchBegan,
  timing,
  transformOrigin,
  translate,
  vec,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");
const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

const PinchGesture2 = () => {
  const origin = vec.createValue(0);
  const pinch = vec.createValue(0);
  const focal = vec.createValue(0);
  const scale = new Value(1);
  const numberOfPointers = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const pinchGestureHandler = onGestureEvent({
    numberOfPointers,
    scale,
    state,
    focalX: focal.x,
    focalY: focal.y,
  });
  const adjustedFocal = vec.sub(focal, CENTER);
  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(
          pinchActive(state, numberOfPointers),
          vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal)))
        ),
        cond(eq(state, State.END), [
          set(pinch.x, timing({ from: pinch.x, to: 0 })),
          set(pinch.y, timing({ from: pinch.y, to: 0 })),
          set(scale, timing({ from: scale, to: 1 })),
        ]),
      ]),
    [adjustedFocal, numberOfPointers, origin, pinch, scale, state]
  );
  return (
    <PinchGestureHandler {...pinchGestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [
                ...translate(pinch),
                ...transformOrigin(origin, { scale }),
              ],
            },
          ]}
          source={require("../assets/zurich.jpg")}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default PinchGesture2;
