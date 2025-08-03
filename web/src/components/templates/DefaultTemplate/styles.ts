import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > section {
    width: 100%;
    min-height: 60vh;
    padding: 32px;
    max-width: 860px;
  }
`;
