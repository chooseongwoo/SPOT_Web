import { Metadata } from "next";
import Capsule from "@/app/(history)/write/capsule/Capsule";
import React from "react";

export const metadata: Metadata = {
  title: "타임캡슐 작성",
  description: "SPOT 타임캡슐 작성 페이지입니다.",
};

export default function Page() {
  return <Capsule />;
}
