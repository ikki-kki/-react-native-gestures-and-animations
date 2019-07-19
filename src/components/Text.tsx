import React, { ReactNode } from "react";
import { Text, TextProps as OriginalTextProps } from "react-native";

import StyleGuide from "./StyleGuide";

export interface TextProps extends OriginalTextProps {
  type?: keyof typeof StyleGuide["typography"];
  children: ReactNode;
}

export default ({ type, style, children }: TextProps) => {
  return (
    <Text style={[StyleGuide.typography[type || "body"], style]}>
      {children}
    </Text>
  );
};
