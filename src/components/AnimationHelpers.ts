import Animated, { Easing } from "react-native-reanimated";

const {
  Clock,
  Value,
  block,
  cond,
  and,
  not,
  clockRunning,
  startClock,
  timing: reTiming,
  stopClock
} = Animated;

export interface TimingProps {
  clock?: Animated.Clock;
  from?: Animated.Value<number> | number;
  to?: Animated.Value<number>;
  duration?: Animated.Adaptable<number>;
  easing?: Animated.EasingFunction;
  autoStart?: boolean;
}

export const timing = (timingConfig: TimingProps) => {
  const { clock, easing, duration, autoStart, from, to } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    autoStart: true,
    from: 0,
    to: 1,
    ...timingConfig
  };

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: typeof from === "number" ? new Value(from) : from,
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    toValue: to,
    duration,
    easing
  };

  return block([
    cond(and(not(clockRunning(clock)), autoStart ? 1 : 0), startClock(clock)),
    reTiming(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
};
