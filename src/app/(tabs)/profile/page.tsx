import { Metadata } from "next";
import Profile from "@/app/(tabs)/profile/Profile";
import React from "react";

export const metadata: Metadata = {
  title: "프로필",
  description: "SPOT 프로필 페이지입니다.",
};

export default function Page() {
  return <Profile />;
}
