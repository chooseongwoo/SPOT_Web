"use client";

import { CustomButton, CustomInput } from "@/components";
import { useAddCommentMutation } from "@/services/message/mutation";
import { useState } from "react";

interface CommentInputProps {
  message_id: string;
}

const CommentInput = ({ message_id }: CommentInputProps) => {
  const [content, setContent] = useState("");
  const addComment = useAddCommentMutation(message_id);

  const handleSubmit = () => {
    if (!content.trim()) return;
    addComment.mutate({ content }, { onSuccess: () => setContent("") });
  };

  return (
    <div className="flex w-full items-center gap-1 p-2">
      <div className="flex w-3/4 items-center">
        <CustomInput
          label=""
          value={content}
          setValue={setContent}
          placeholder="댓글을 입력하세요..."
        />
      </div>
      <div className="flex w-1/4 items-center">
        <CustomButton title="등록" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CommentInput;
