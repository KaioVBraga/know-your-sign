import React, { useCallback, useEffect, useState } from "react";
import Poll from "../Poll";
import { Container } from "./styles";
import Loader from "@/components/atoms/Loader";
import { api } from "@/services/api.service";

const PollsFeed: React.FC<any> = (props) => {
  const [polls, setPolls] = useState([]);

  const getPolls = useCallback(async () => {
    try {
      const { data } = await api.get("polls");
      setPolls(data);
    } catch (err: any) {
      console.error(err);
      swal("Error", err.message || "Generic error", "erropr");
    }
  }, []);

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <Container>
      {polls.map((poll, index) => {
        return <Poll key={index} poll={poll} />;
      })}

      <Loader />
    </Container>
  );
};

export default PollsFeed;
