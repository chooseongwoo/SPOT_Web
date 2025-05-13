"use client";

import { CloseIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function CloseTab() {
  const router = useRouter();

  return (
    <div className="flex w-full items-start justify-end py-3">
      <CloseIcon onClick={() => router.push("/")} />
    </div>
  );
}
