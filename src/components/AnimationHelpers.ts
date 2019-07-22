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
  timing,
  set
} = Animated;

export interface LoopProps {
  clock?: Animated.Clock;
  easing?: Animated.EasingFunction;
  duration?: number;
  boomerang?: boolean;
  autoStart?: boolean;
}

export const loop = (loopConfig: LoopProps) => {
  const { clock, easing, duration, boomerang, autoStart } = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    boomerang: false,
    autoStart: true,
    ...loopConfig
  };
  const state = {
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
    timing(clock, state, config),
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
