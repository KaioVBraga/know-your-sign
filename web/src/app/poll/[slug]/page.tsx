"use client";

import Loader from "@/components/atoms/Loader";
import FullPoll from "@/components/organisms/Polls/FullPoll";
import DefaultTemplate from "@/components/templates/DefaultTemplate";
import { api } from "@/services/api.service";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PostPage = () => {
  const [poll, setPoll] = useState<PollEntity | undefined>(undefined);

  const params = useParams();

  const getPoll = useCallback(async () => {
    try {
      const { data } = await api.get(`polls/${params.slug}`);
      setPoll(data);
    } catch (err: any) {
      console.error(err);
      swal("Error", err.message || "Generic error", "erropr");
    }
  }, []);

  useEffect(() => {
    getPoll();
  }, []);

  return (
    <DefaultTemplate loading={!poll}>
      <FullPoll poll={poll as PollEntity} />
    </DefaultTemplate>
  );
};

export default PostPage;
