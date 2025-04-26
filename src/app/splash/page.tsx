import Image from "next/image";

export default function SplashPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Image
        alt="스플래시 이미지"
        src="/images/SplashImage.png"
        width={149}
        height={93}
      />
    </main>
  );
}
