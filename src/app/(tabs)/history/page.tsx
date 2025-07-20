import { Metadata } from "next";
import History from "@/app/(tabs)/history/History";

export const metadata: Metadata = {
  title: "히스토리",
  description: "SPOT 히스토리 페이지입니다.",
};

export default function Page() {
  return <History />;
}
