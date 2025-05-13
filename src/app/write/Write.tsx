"use client";

import { useState } from "react";
import HistoryTypeContainer from "@/app/write/HistoryTypeContainer";
import { CustomButton, CloseTab } from "@/components/";
import { useRouter } from "next/navigation";

export default function Write() {
  const router = useRouter();
  const [selected, setSelected] = useState<"message" | "capsule" | null>(null);
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <CloseTab />
      <div className="mt-60 flex h-full flex-col gap-[30px]">
        <p className="text-b1 text-black">어떤 방식으로 기록을 남길까요?</p>
        <div className="flex justify-center gap-4">
          <HistoryTypeContainer
            type="message"
            isSelected={selected === "message"}
            onClick={() => setSelected("message")}
          />
          <HistoryTypeContainer
            type="capsule"
            isSelected={selected === "capsule"}
            onClick={() => setSelected("capsule")}
          />
        </div>
      </div>
      <div className="absolute bottom-10 w-full px-6">
        <CustomButton
          title="다음"
          onClick={() =>
            router.push(`${selected === "capsule" ? "capsule" : "message"}`)
          }
          disabled={!selected}
        />
      </div>
    </div>
  );
}
