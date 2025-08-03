import React from "react";
import { EnvelopeFill, Github, Linkedin } from "react-bootstrap-icons";
import { Container } from "./styles";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Container>
      <div>
        <EnvelopeFill />
        <Github />
        <Linkedin />
      </div>
      <div>Polly© {year}</div>
    </Container>
  );
};

export default Footer;
