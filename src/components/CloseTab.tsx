"use client";

import { CloseIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function CloseTab({
  color = "black",
}: {
  color?: "black" | "white";
}) {
  const router = useRouter();

  return (
    <div className="flex w-full items-start justify-end py-3">
      <CloseIcon onClick={() => router.push("/")} color={color} />
    </div>
  );
}
