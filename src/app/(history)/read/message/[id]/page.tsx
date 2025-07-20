import { Metadata } from "next";
import MessageDetail from "@/app/(history)/read/message/[id]/MessageDetail";

export const metadata: Metadata = {
  title: "메시지 상세",
  description: "SPOT 메시지 상세 페이지입니다.",
};

export default function Page() {
  return <MessageDetail />;
}
