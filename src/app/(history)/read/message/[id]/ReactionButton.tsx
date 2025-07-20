"use client";

import { HeartIcon } from "@/components/icons";
import {
  useAddReactionMutation,
  useRemoveReactionMutation,
} from "@/services/message/mutation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

interface ReactionButtonProps {
  message_id: string;
  reactions: { user_id: string }[];
}

const ReactionButton = ({ message_id, reactions }: ReactionButtonProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const addReaction = useAddReactionMutation(message_id);
  const removeReaction = useRemoveReactionMutation(message_id);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id);
    };
    getUser();
  }, []);

  const liked = reactions.some((r) => r.user_id === userId);

  const handleReaction = () => {
    if (liked) {
      removeReaction.mutate();
    } else {
      addReaction.mutate();
    }
  };

  return (
    <button onClick={handleReaction} className="flex items-center gap-x-1">
      <HeartIcon
        width={20}
        height={20}
        color={liked ? "#FF0000" : "currentColor"}
      />
      <span>{reactions.length}</span>
    </button>
  );
};

export default ReactionButton;
