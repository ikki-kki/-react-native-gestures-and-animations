import * as React from "react";

import {
  Text as OriginalText,
  TextProps as OrignalTextProps
} from "../components";

interface TextProps extends OrignalTextProps {
  dark?: boolean;
}

export default ({ dark, style, children, ...props }: TextProps) => {
  const color = dark ? "white" : "black";
  return (
    <OriginalText style={[style, { color }]} {...props}>
      {children}
    </OriginalText>
  );
};
