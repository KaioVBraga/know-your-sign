import { StyleParam } from "@/@types/General";
import Link from "next/link";
import styled from "styled-components";

interface ContainerProps {
  styles: StyleParam;
}

export const Container = styled(Link)<ContainerProps>`
  color: var(--primary-color);

  &:hover {
    opacity: 0.75;
  }

  ${(props) => props.styles}
`;
