import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: var(--margin-2);

  > fieldset {
    display: flex;
    flex-direction: column;
    row-gap: var(--margin-1);
    border: none;
  }

  input,
  select {
    background-color: #ffffff;
    min-height: 32px;
    padding: 14px;
    border: 1px solid #686868;
    border-radius: 4px;

    &:focus {
      outline: 2px solid #686868;
    }
  }

  button {
    border: none;
    background-color: var(--duolingo-green-color);
    padding: 16px;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-medium);

    &:hover {
      opacity: 0.75;
    }
  }
`;
