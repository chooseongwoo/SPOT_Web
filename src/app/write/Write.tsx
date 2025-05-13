"use client";

import { useState } from "react";
import HistoryTypeContainer from "@/app/write/HistoryTypeContainer";
import { CustomButton, CloseTab } from "@/components/";
import { useRouter } from "next/navigation";

export default function Write() {
  const router = useRouter();
  const [selected, setSelected] = useState<"message" | "capsule" | null>(null);
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <CloseTab />
      <div className="flex flex-col gap-[30px] mt-60 h-full">
        <p className="text-black text-b1">어떤 방식으로 기록을 남길까요?</p>
        <div className="flex gap-4 justify-center">
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
          onClick={() => router.push(`${selected === "capsule"}`)}
          disabled={!selected}
        />
      </div>
    </div>
  );
}
