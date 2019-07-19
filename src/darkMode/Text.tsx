import * as React from "react";
import { View } from "react-native";

import {
  Text as OriginalText,
  TextProps as OrignalTextProps
} from "../components";

interface TextProps extends OrignalTextProps {
  dark?: boolean;
}

export default ({ dark, children, ...props }: TextProps) => {
  return <OriginalText {...props}>{children}</OriginalText>;
};
