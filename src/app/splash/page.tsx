import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "스플래시",
  description: "SPOT 스플래시 페이지입니다.",
};

export default function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Image
        alt="스플래시 이미지"
        src="/images/SplashImage.png"
        width={149}
        height={93}
      />
    </main>
  );
}
