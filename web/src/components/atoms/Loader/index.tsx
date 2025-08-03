import { StyleParam } from "@/@types/General";
import React from "react";
import { Container } from "./styles";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  styles?: StyleParam;
}

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <Container styles={props.styles}>
      <ClipLoader />
    </Container>
  );
};

export default Loader;
