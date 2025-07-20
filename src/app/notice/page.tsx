import { Metadata } from "next";
import { Header } from "@/components";
import Notice from "./Notice";

export const metadata: Metadata = {
  title: "공지사항",
  description: "SPOT 공지사항 페이지입니다.",
};

export default function NoticePage() {
  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-gray-50">
      <Header title="공지사항" />
      <Notice />
    </div>
  );
}
