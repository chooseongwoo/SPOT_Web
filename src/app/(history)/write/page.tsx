import { Metadata } from "next";
import Write from "./Write";

export const metadata: Metadata = {
  title: "작성",
  description: "SPOT 메시지/타임캡슐 작성 페이지입니다.",
};

export default function Page() {
  return <Write />;
}
