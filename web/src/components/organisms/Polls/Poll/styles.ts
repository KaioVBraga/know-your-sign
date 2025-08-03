import Anchor from "@/components/atoms/Anchor";
import Image from "next/image";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: var(--margin-2);
  box-shadow: var(--box-shadow);
  padding: var(--padding-4);
  border-radius: var(--padding-1);

  > div:first-child {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: var(--margin-2);
  }
`;

export const LinkContainer = styled(Anchor).attrs(() => ({
  styles: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: var(--margin-2);
    transition: var(--transition-medium);

    &:hover {
      opacity: 0.75;
    }
  `,
}))``;

export const PublishedAtLabel = styled.span`
  color: rgba(0, 0, 0, 0.55);
  font-weight: 500;
  font-size: 14px;
`;

export const Title = styled.h2`
  color: #fff;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;

  > span {
    text-transform: uppercase;
    color: var(--primary-color);
    font-size: 12px;
  }
`;

export const DescriptionContainer = styled.p`
  color: rgba(0, 0, 0, 0.75);
`;

export const PollOptionsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  > li {
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

export const HeroImage = styled(Image)`
  position: relative !important;
  border-radius: 8px;
`;
