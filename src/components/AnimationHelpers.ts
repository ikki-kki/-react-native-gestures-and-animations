import Animated, { Easing } from "react-native-reanimated";

const {
  Clock,
  Value,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  timing: reTiming,
  stopClock,
  set
} = Animated;

export interface TimingProps {
  clock?: Animated.Clock;
  from?: Animated.Adaptable<number>;
  to?: Animated.Adaptable<number>;
  duration?: Animated.Adaptable<number>;
  easing?: Animated.EasingFunction;
}

export const timing = (timingConfig: TimingProps) => {
  const { clock, easing, duration, from, to: toValue } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    from: 0,
    to: 1,
    ...timingConfig
  };

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    toValue,
    duration,
    easing
  };

  return block([
    cond(not(clockRunning(clock)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, from),
      set(state.frameTime, 0),
      startClock(clock)
    ]),
    reTiming(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
};

export const delay = (node: Animated.Node<number>, duration: number) => {
  const clock = new Clock();
  return block([
    timing({ clock, from: 0, to: 1, duration }),
    cond(not(clockRunning(clock)), node)
  ]);
};
