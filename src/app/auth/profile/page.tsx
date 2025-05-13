import { Metadata } from "next";
import Profile from "./Profile";

export const metadata: Metadata = {
  title: "프로필 설정",
  description: "SPOT 프로필 설정 페이지입니다.",
};

export default function Page() {
  return <Profile />;
}
