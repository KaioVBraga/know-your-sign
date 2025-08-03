import React from "react";
import { Container } from "./styles";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Loader from "@/components/atoms/Loader";

interface DefaultTemplateProps {
  loading?: boolean;
  children: any;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = (props) => {
  return (
    <Container>
      <Navbar />
      <section>{props.loading ? <Loader /> : props.children}</section>
      <Footer />
    </Container>
  );
};

export default DefaultTemplate;
