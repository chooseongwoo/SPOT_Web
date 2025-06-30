import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage, createCapsule, readMessage } from "./api";
import QUERY_KEY from "@/constants/queryKey";

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.NEARBY] });
    },
  });
};

export const useCreateCapsuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCapsule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.NEARBY] });
    },
  });
};

export const useReadMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: readMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.NEARBY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.message.FOUND] });
    },
  });
};
