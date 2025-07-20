import { Metadata } from "next";
import Result from "@/app/(history)/write/result/Result";

export const metadata: Metadata = {
  title: "작성 완료",
  description: "SPOT 메시지/타임캡슐 작성 완료 페이지입니다.",
};

export default function Page() {
  return <Result />;
}
