import * as React from "react";
import { View, ViewProps as OriginalViewProps } from "react-native";

interface ViewProps extends OriginalViewProps {
  dark?: boolean;
}

export default ({ dark, children, ...props }: ViewProps) => {
  return <View {...props}>{children}</View>;
};
