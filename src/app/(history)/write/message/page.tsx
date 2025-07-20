import { Metadata } from "next";
import Message from "./Message";

export const metadata: Metadata = {
  title: "메시지 작성",
  description: "SPOT 메시지 작성 페이지입니다.",
};

export default function Page() {
  return <Message />;
}
