import React, { ReactNode } from "react";
import { View, ViewProps as OriginalViewProps } from "react-native";

interface ViewProps extends OriginalViewProps {
  dark?: boolean;
  children?: ReactNode;
}

export default ({ dark, style, children, ...props }: ViewProps) => {
  const backgroundColor = dark ? "black" : "transparent";
  return (
    <View style={[style, { backgroundColor }]} {...props}>
      {children}
    </View>
  );
};
