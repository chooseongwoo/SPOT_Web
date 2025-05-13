"use client";

import { useHashParams } from "@/hooks";
import { TOKEN } from "@/constants";
import { Storage } from "@/storage";
import { useEffect } from "react";
import { useLoginMutation } from "@/services/user/mutation";

export default function Callback() {
  const params = useHashParams();
  const { mutate: loginMutate } = useLoginMutation();

  useEffect(() => {
    if (!params) return;

    const accessToken = params.get(TOKEN.ACCESS);
    const refreshToken = params.get(TOKEN.REFRESH);
    if (accessToken && refreshToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);

      loginMutate();
    } else {
      alert("로그인에 실패했습니다.");
    }
  }, [params, loginMutate]);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <span className="text-b1 text-black">로그인 중...</span>
    </main>
  );
}
