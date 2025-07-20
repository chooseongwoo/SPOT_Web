"use client";

import HistoryType from "@/types/history.type";
import { formatTimeAgo } from "@/utils";
import Image from "next/image";

interface CommentItemProps {
  comment: HistoryType["comments"][0];
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex items-start gap-x-2 py-2">
      <Image
        src={comment.users.profile_image_url}
        alt="profile"
        width={28}
        height={28}
        className="rounded-full mt-1"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-x-2">
          <span className="font-semibold text-sm">{comment.users.nickname}</span>
          <span className="text-xs text-gray-400">
            {formatTimeAgo(comment.created_at)}
          </span>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
