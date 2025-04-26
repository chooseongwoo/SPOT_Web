import KakaoLogo from "@/components/login/KakaoLogo";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <button className="absolute bottom-[21px] flex h-14 w-[327px] items-center rounded-xl bg-yellow px-3">
        <KakaoLogo />
        <span className="w-full text-btn2 text-black">
          카카오로 3초만에 로그인
        </span>
      </button>
    </main>
  );
}
