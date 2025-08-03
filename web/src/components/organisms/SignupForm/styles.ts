import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.section`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow);
  padding: var(--padding-4);
  gap: var(--margin-4);

  > h1 {
    font-size: 24px;
  }
`;
