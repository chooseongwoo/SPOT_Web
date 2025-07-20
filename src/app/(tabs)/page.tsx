import { Metadata } from "next";
import Home from "@/app/(tabs)/Home";

export const metadata: Metadata = {
  title: "홈",
  description: "SPOT 홈 페이지입니다.",
};

export default function Page() {
  return (
    <div className="h-screen w-screen flex-1">
      <Home />
    </div>
  );
}
