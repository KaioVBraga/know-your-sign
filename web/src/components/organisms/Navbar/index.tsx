import React from "react";
import { Container } from "./styles";
import Anchor from "@/components/atoms/Anchor";

const Navbar: React.FC<any> = (props) => {
  return (
    <Container>
      <Anchor href="/">Polly</Anchor>
    </Container>
  );
};

export default Navbar;
