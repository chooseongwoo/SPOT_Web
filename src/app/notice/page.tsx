import { Header } from "@/components";
import Notice from "./Notice";

export default function NoticePage() {
  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-gray-50">
      <Header title="공지사항" />
      <Notice />
    </div>
  );
}
