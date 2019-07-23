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
  set,
  stopClock
} = Animated;

export interface TimingProps {
  clock?: Animated.Clock;
  from?: Animated.Adaptable<number>;
  to?: Animated.Adaptable<number>;
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
    position: !(from instanceof Value) ? new Value(from) : from,
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

export interface LoopProps {
  clock?: Animated.Clock;
  easing?: Animated.EasingFunction;
  duration?: Animated.Adaptable<number>;
  boomerang?: boolean;
  autoStart?: boolean;
}

// TODO: fix typing: if autoStart = false, clock must be provided
export const loop = (loopConfig: LoopProps) => {
  const { clock, easing, duration, boomerang, autoStart } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    boomerang: false,
    autoStart: true,
    ...loopConfig
  };

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    toValue: new Value(1),
    duration,
    easing
  };

  return block([
    cond(and(not(clockRunning(clock)), autoStart ? 1 : 0), startClock(clock)),
    reTiming(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      boomerang
        ? set(config.toValue, cond(config.toValue, 0, 1))
        : set(state.position, 0)
    ]),
    state.position
  ]);
};
