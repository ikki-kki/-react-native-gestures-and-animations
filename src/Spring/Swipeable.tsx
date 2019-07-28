import * as React from "react";
import { StyleSheet } from "react-native";
import { snapPoint, onGestureEvent } from "react-native-redash";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const {
  Value,
  useCode,
  block,
  set,
  cond,
  eq,
  Clock,
  call,
  clockRunning,
  startClock,
  stopClock,
  spring: reSpring
} = Animated;

interface InteractableProps {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
  snapPoints: number[];
  onSnap: (x: number) => void;
}

interface SpringProps {
  clock?: Animated.Clock;
  value: Animated.Node<number>;
  velocity: Animated.Node<number>;
  dest: Animated.Adaptable<number>;
  config?: Animated.SpringConfig;
}

export function spring(springProps: SpringProps) {
  const { clock, value, dest, config, velocity } = {
    clock: new Clock(),
    config: {
      toValue: new Value(0),
      damping: 7,
      mass: 1,
      stiffness: 121.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001
    },
    ...springProps
  };

  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, velocity),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    reSpring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
}

const withSpring = (
  value: Animated.Node<number>,
  velocity: Animated.Node<number>,
  state: Animated.Value<State>,
  snapPoints: number[]
) => {
  return cond(
    eq(state, State.END),
    spring({ value, velocity, dest: snapPoint(value, velocity, snapPoints) }),
    value
  );
};

export default ({ x, y, snapPoints, onSnap }: InteractableProps) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    velocityX,
    translationX,
    translationY,
    state
  });
  const translateX = withSpring(translationX, velocityX, state, snapPoints);
  const translateY = withSpring(translationY, velocityY, state, [0]);
  useCode(block([set(x, translateX), set(y, translateY)]), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
