"use client";

import { CloseIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function CloseTab() {
  const router = useRouter();

  return (
    <div className="w-full py-3 flex justify-end items-start">
      <CloseIcon onClick={() => router.back()} />
    </div>
  );
}
