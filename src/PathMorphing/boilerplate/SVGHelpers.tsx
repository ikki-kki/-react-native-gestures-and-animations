import Animated from "react-native-reanimated";
import { string } from "react-native-redash";

const { concat } = Animated;

enum SVGCommand {
  MOVE,
  CURVE,
  CLOSE,
}

interface SVGSegment {
  type: SVGCommand;
}

interface Move extends SVGSegment {
  type: SVGCommand.MOVE;
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

interface Curve extends SVGSegment {
  type: SVGCommand.CURVE;
  to: Point;
  c1: Point;
  c2: Point;
}

const serializeMove = (c: Move) => string`M${c.x},${c.y} `;
const serializeClose = () => string`Z`;
const serializeCurve = (c: Curve) =>
  string`C${c.c1.x},${c.c1.y} ${c.c2.x},${c.c2.y} ${c.to.x},${c.to.y} `;

const isMove = (command: SVGSegment): command is Move =>
  command.type === SVGCommand.MOVE;

const isCurve = (command: SVGSegment): command is Curve =>
  command.type === SVGCommand.CURVE;

export const serialize = (path: SVGSegment[]) => {
  return path
    .map((segment) => {
      if (isMove(segment)) {
        return serializeMove(segment);
      }
      if (isCurve(segment)) {
        return serializeCurve(segment);
      }
      return serializeClose();
    })
    .reduce((acc, c) => concat(acc, c));
};

/*
interface PathInterpolation<T extends readonly number[]> {
  inputRange: T;
  outputRange: { [K in keyof T]: SVGSegment[] };
}
*/

export const createSVGPath = (): SVGSegment[] => [];

export const moveTo = (commands: SVGSegment[], x: number, y: number) => {
  commands.push({ type: SVGCommand.MOVE, x, y } as Move);
};

export const curveTo = (commands: SVGSegment[], c: Omit<Curve, "type">) => {
  commands.push({ type: SVGCommand.CURVE, ...c });
};

export const close = (commands: SVGSegment[]) => {
  commands.push({ type: SVGCommand.CLOSE });
};
