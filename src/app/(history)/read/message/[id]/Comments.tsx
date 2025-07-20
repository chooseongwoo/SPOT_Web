"use client";

import HistoryType from "@/types/history.type";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

interface CommentsProps {
  message_id: string;
  comments: HistoryType["comments"];
}

const Comments = ({ message_id, comments }: CommentsProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="grow overflow-y-auto p-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <CommentInput message_id={message_id} />
    </div>
  );
};

export default Comments;
