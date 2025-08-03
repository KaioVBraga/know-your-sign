import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 32px;

  > div {
    display: flex;
    justify-content: center;
    column-gap: 16px;

    > svg {
      font-size: 24px;
      cursor: pointer;
      transition: 0.1s all ease-in-out;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;
