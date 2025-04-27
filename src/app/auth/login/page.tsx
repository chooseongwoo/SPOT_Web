"use client";
import { KakaoLogo } from "@/components/icons";
import { signInWithKakao } from "@/services/user/api";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Image
        alt="로고 이미지"
        src="/images/SplashImage.png"
        width={90}
        height={56}
      />
      <div className="mt-4 flex flex-col items-center gap-1">
        <p className="text-t2 text-black">장소에 남기는 작은 이야기</p>
        <p className="text-b1 text-gray-4">
          스팟에 당신만의 기록을 남겨보세요!
        </p>
      </div>
      <Image
        alt="로그인 이미지"
        src="/images/LoginImage.png"
        width={200}
        height={200}
      />
      <button
        className="mt-6 flex h-14 w-[327px] items-center rounded-xl bg-yellow px-3"
        onClick={signInWithKakao}
      >
        <KakaoLogo />
        <span className="w-full text-btn2 text-black">
          카카오로 3초만에 로그인
        </span>
      </button>
    </main>
  );
}
