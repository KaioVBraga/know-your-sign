import React, { useCallback } from "react";
import {
  Container,
  DescriptionContainer,
  PollOptionsContainer,
  PublishedAtLabel,
  CategoriesContainer,
  Title,
  HeroImage,
  LinkContainer,
} from "./styles";
import { formatDate } from "@/utils/dates";
import Anchor from "@/components/atoms/Anchor";
import { api } from "@/services/api.service";

interface PostItemsProps {
  poll: PollEntity;
}

const Poll: React.FC<PostItemsProps> = (props) => {
  const voteFor = useCallback(async (option: PollOptionEntity) => {
    try {
      await api.post("poll-votes", {
        pollOptionId: option.id,
      });

      swal("Success", "Vote registered", "success");
    } catch (err: any) {
      console.error(err);
      swal("Error", err.message || "Generic error", "error");
    }
  }, []);

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
          <li key={option.id} onClick={() => voteFor(option)}>
            {option.content}
          </li>
        ))}
      </PollOptionsContainer>
    </Container>
  );
};

export default Poll;
