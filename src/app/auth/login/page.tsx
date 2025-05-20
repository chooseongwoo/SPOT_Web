import Login from "./Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "SPOT 로그인 페이지입니다.",
};

export default function Page() {
  return <Login />;
}
