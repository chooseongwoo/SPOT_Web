"use client";

import { useHashParams } from "@/hooks";
import { TOKEN } from "@/constants";
import { Storage } from "@/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useHashParams();

  useEffect(() => {
    if (!params) return;

    const accessToken = params.get(TOKEN.ACCESS);
    const refreshToken = params.get(TOKEN.REFRESH);
    if (accessToken && refreshToken) {
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);

      router.replace("/");
    } else {
      alert("로그인에 실패했습니다.");
    }
  }, [router, params]);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <span className="text-b1 text-black">로그인 중...</span>
    </main>
  );
}
