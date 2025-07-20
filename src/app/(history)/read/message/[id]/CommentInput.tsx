"use client";

import { CustomButton } from "@/components";
import { useAddCommentMutation } from "@/services/message/mutation";
import { useState } from "react";

interface CommentInputProps {
  message_id: string;
}

const CommentInput = ({ message_id }: CommentInputProps) => {
  const [content, setContent] = useState("");
  const addComment = useAddCommentMutation(message_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    addComment.mutate({ content }, { onSuccess: () => setContent("") });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-2 p-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />
      <CustomButton type="submit" size="sm">
        등록
      </CustomButton>
    </form>
  );
};

export default CommentInput;
