"use client";

import { useState } from "react";

export default function Message() {
  const [selectedTab, setSelectedTab] = useState<"mine" | "found">("mine");

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex w-full justify-start px-6 py-3">
        <p className="text-headline text-black">메시지</p>
      </div>
      <div className="flex w-full justify-center gap-[18px] px-6">
        <div
          onClick={() => setSelectedTab("mine")}
          className={`flex-1 cursor-pointer pb-[7px] text-center text-b2
            ${
              selectedTab === "mine"
                ? "border-b border-b-black text-black"
                : "border-b-0 text-gray-400"
            }`}
        >
          내 메시지
        </div>
        <div
          onClick={() => setSelectedTab("found")}
          className={`flex-1 cursor-pointer pb-[7px] text-center text-b2
            ${
              selectedTab === "found"
                ? "border-b border-b-black text-black"
                : "border-b-0 text-gray-400"
            }`}
        >
          발견한 메시지
        </div>
      </div>
    </div>
  );
}
