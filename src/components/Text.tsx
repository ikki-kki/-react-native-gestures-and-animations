import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

import StyleGuide from "./StyleGuide";

export interface TextProps {
  type?: keyof typeof StyleGuide["typography"];
  style?: TextStyle;
  children: ReactNode;
}

export default ({ type, style, children }: TextProps) => {
  return (
    <Text style={[StyleGuide.typography[type || "body"], style]}>
      {children}
    </Text>
  );
};
