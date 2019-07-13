import * as React from "react";
import { View } from "react-native";

import { Container, Thumbnail } from "../components";

export const examples = [
  {
    id: "layouts",
    title: "Layouts",
    source: require("../../assets/examples/layouts.png")
  }
];

interface ExamplesProps {}

export default () => {
  return (
    <Container title="Examples">
      {examples.map(thumbnail => (
        <Thumbnail key={thumbnail.id} {...{ thumbnail }} />
      ))}
    </Container>
  );
};
