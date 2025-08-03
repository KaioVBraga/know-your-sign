import { formatDate } from "@/utils/dates";
import React from "react";
import {
  CategoriesContainer,
  Container,
  DescriptionContainer,
  HeroImage,
  LinkContainer,
  PollOptionsContainer,
  PublishedAtLabel,
} from "./styles";

interface PostItemsProps {
  poll: PollEntity;
}

const FullPoll: React.FC<PostItemsProps> = (props) => {
  return (
    <Container>
      <LinkContainer href={`/poll/${props.poll.slug}`}>
        {props.poll.image.includes(".") && (
          <HeroImage
            src={props.poll.image}
            fill
            alt=""
            onError={(error) => console.log(error)}
          />
        )}

        <PublishedAtLabel>{formatDate(props.poll.createDt)}</PublishedAtLabel>
        <CategoriesContainer>
          {props.poll.categories.map((c) => (
            <span key={c.id}>{c.name}</span>
          ))}
        </CategoriesContainer>
        <DescriptionContainer>{props.poll.content}</DescriptionContainer>
      </LinkContainer>

      <PollOptionsContainer>
        {props.poll.options.map((option) => (
          <li key={option.id}>{option.content}</li>
        ))}
      </PollOptionsContainer>
    </Container>
  );
};

export default FullPoll;
