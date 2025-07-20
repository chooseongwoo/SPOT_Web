"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMessageQuery } from "@/services/message/query";
import { useReadMessageMutation } from "@/services/message/mutation";
import MessageDetailContent from "./MessageDetailContent";

export default function MessageDetail() {
  const params = useParams<{ id: string }>();
  const { data: message, isLoading, error } = useMessageQuery(params.id);
  const { mutate: readMessage } = useReadMessageMutation();

  useEffect(() => {
    if (message) {
      readMessage(message.id);
    }
  }, [message, readMessage]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;
  if (!message) return <div>데이터 없음</div>;

  return <MessageDetailContent message={message} />;
}