import * as React from "react";
import { StyleSheet } from "react-native";
import { snapPoint, onGestureEvent } from "react-native-redash";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useMemoOne } from "use-memo-one";

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
  spring: reSpring,
  and,
  not,
  neq,
  add,
  debug
} = Animated;

interface InteractableProps {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
  snapPoints: number[];
  onSnap?: (value: [number]) => void;
}

interface WithSpringProps {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  snapPoints: number[];
  offset?: Animated.Value<number>;
  config?: Animated.SpringConfig;
  onSnap?: (value: [number]) => void;
}

const withSpring = (props: WithSpringProps) => {
  const { value, velocity, state, snapPoints, offset, config, onSnap } = {
    offset: new Value(0),
    config: {
      toValue: new Value(0),
      damping: 26,
      mass: 1,
      stiffness: 170,
      overshootClamping: false,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 1
    },
    ...props
  };
  const clock = new Clock();
  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [set(offset, springState.position), stopClock(clock)];
  const snap = [
    cond(clockRunning(clock), onSnap && call([springState.position], onSnap))
  ];

  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(neq(state, State.END), [
      set(springState.finished, 0),
      set(springState.position, add(offset, value))
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(config.toValue, snapPoint(value, velocity, snapPoints)),
        startClock(clock)
      ]),
      reSpring(clock, springState, config),
      cond(springState.finished, [...snap, ...finishSpring])
    ]),
    springState.position
  ]);
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
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    snapPoints,
    onSnap
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    snapPoints: [0]
  });
  useCode(block([set(x, translateX), set(y, translateY)]), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
