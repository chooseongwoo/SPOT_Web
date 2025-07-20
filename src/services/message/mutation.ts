"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, addReaction, removeReaction, readMessage, createMessage, createCapsule } from "./api";
import QUERY_KEY from "@/constants/queryKey";

export const useAddReactionMutation = (message_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addReaction(message_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.message.DETAIL, message_id],
      });
    },
  });
};

export const useRemoveReactionMutation = (message_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeReaction(message_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.message.DETAIL, message_id],
      });
    },
  });
};

export const useAddCommentMutation = (message_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content }: { content: string }) =>
      addComment({ message_id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.message.DETAIL, message_id],
      });
    },
  });
};

export const useReadMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => readMessage(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.DETAIL, id] });
    },
  });
};

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.NEARBY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.MINE] });
    },
  });
};

export const useCreateCapsuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCapsule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.NEARBY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.MINE] });
    },
  });
};
