import { Metadata } from "next";
import CapsuleDetail from "@/app/(history)/read/capsule/[id]/CapsuleDetail";

export const metadata: Metadata = {
  title: "타임캡슐 상세",
  description: "SPOT 타임캡슐 상세 페이지입니다.",
};

export default function Page() {
  return <CapsuleDetail />;
}
