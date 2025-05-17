"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Message() {
  const [selectedTab, setSelectedTab] = useState<"mine" | "found">("mine");

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex w-full justify-start px-6 py-3">
        <p className="text-headline text-black">메시지</p>
      </div>

      <div className="relative flex w-full justify-center gap-[18px] px-6">
        <div
          onClick={() => setSelectedTab("mine")}
          className={`flex-1 cursor-pointer pb-[7px] text-center ${
            selectedTab === "mine"
              ? "text-btn1 text-black"
              : "text-b2 text-gray-400"
          }`}
        >
          내 메시지
        </div>
        <div
          onClick={() => setSelectedTab("found")}
          className={`flex-1 cursor-pointer pb-[7px] text-center text-b2 ${
            selectedTab === "found"
              ? "text-btn1 text-black"
              : "text-b2 text-gray-400"
          }`}
        >
          발견한 메시지
        </div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 380, damping: 40 }}
          className="absolute bottom-0 h-[2px] w-[calc(50%-20px)] bg-black"
          style={{
            left:
              selectedTab === "mine" ? "calc(0% + 20px)" : "calc(50% + 4px)",
          }}
        />
      </div>
    </div>
  );
}
