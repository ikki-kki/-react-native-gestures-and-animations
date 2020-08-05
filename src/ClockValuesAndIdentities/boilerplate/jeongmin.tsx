import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useCode,
  cond,
  eq,
  interpolate,
  Extrapolate,
  set,
  startClock,
  not,
  add,
  proc,
} from "react-native-reanimated";
import { useClock, useValues } from "react-native-redash";

import { Button, Card, cards } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const duration = 500;
//proc => 애니메이션 node를 사전선언(pre-declare)해서 리렌더를 해야할 때
//runAnimation이 발생하지 않게 한다.
const runAnimation = proc(
  (
    clock: Animated.Clock,
    from: Animated.Value<number>,
    to: Animated.Value<number>,
    startTime: Animated.Value<number>,
    startAnimation: Animated.Value<number>,
    opacity: Animated.Node<number>,
  ) =>
    cond(eq(startAnimation, 1), [
      startClock(clock),
      set(from, opacity),
      set(to, not(to)),
      set(startTime, clock),
      set(startAnimation, 0),
    ]),
);

const ClockValuesAndIdentity = () => {
  const [show, setShow] = useState(true);
  //clock animation => 매 프레임마다 timestamp를 스스로 업데이트함
  //원한다면 호출 발생을 막을 수 있음
  //쓰는 이유는 애니메이션 딜레이 시간이 있는데, 해당시간이 지나지 않았음에도 불구하고 계속 버튼 누르면 렌더상 오류가 생김
  //그래서 스스로 눌렀던 '시간'을 기억해서 불필요하게 반복 랜더가 일어나는걸 막는것
  const clock = useClock();
  const [startTime, from, to, startAnimation] = useValues(0, 0, 0, 0);
  //새로운 value를 초기값 0으로 선언
  //애니메이션 시작 시간을 알려주는 값
  //더할때는 add() 메서드를 사용할 수 있다
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime], //트리거가 발생하고, 꺼지는 타이밍 설정
    outputRange: [from, to], //애니메이션의 from ~ to 설정
    extrapolate: Extrapolate.CLAMP, //애니메이션이 누를때마다 미친듯이 반복되지 않게 설정
  });

  useCode(
    () => runAnimation(clock, from, to, startTime, startAnimation, opacity),
    [clock, from, opacity, startAnimation, startTime, to],
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <Button
        label={show ? "Hide" : "Show"}
        primary
        //버튼을 누르면 해당 value를 1로 변경
        onPress={() => setShow((prev) => !prev)}
      />
    </View>
  );
};

export default ClockValuesAndIdentity;
