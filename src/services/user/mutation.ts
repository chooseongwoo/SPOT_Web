import { initUser } from "@/services/user/api";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: initUser,
    onSuccess: ({ profileComplete }) => {
      if (profileComplete) {
        window.location.replace("/");
      } else {
        window.location.replace("/auth/profile");
      }
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
  });
};
