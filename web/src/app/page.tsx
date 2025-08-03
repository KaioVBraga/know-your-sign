"use client";

import PollsFeed from "@/components/organisms/Polls/PollsFeed";
import DefaultTemplate from "@/components/templates/DefaultTemplate";

const HomePage = () => {
  return (
    <DefaultTemplate>
      <PollsFeed />
    </DefaultTemplate>
  );
};

export default HomePage;
