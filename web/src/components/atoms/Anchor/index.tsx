import { StyleParam } from "@/@types/General";
import React from "react";
import { Container } from "./styles";

interface AnchorProps {
  href: string;
  children: any;
  styles?: StyleParam;
}

const Anchor: React.FC<AnchorProps> = (props) => {
  return (
    <Container href={props.href} styles={props.styles}>
      {props.children}
    </Container>
  );
};

export default Anchor;
