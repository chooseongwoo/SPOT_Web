import { Metadata } from "next";
import Callback from "./Callback";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "로그인 콜백",
  description: "SPOT 로그인 콜백 페이지입니다.",
};

export default function Page() {
  return (
    <Suspense>
      <Callback />
    </Suspense>
  );
}
