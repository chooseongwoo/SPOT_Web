"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import MineContainer from "@/app/(tabs)/message/MineContainer";
import { messageData } from "@/data/messageData";
import FoundContainer from "@/app/(tabs)/message/FoundContainer";

export default function Message() {
  const [selectedTab, setSelectedTab] = useState<"mine" | "found">("found");

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex w-full justify-start px-6 py-3">
        <p className="text-headline text-black">메시지</p>
      </div>

      <div className="relative flex w-full justify-center gap-[18px] px-6">
        <div
          onClick={() => setSelectedTab("mine")}
          className={clsx(
            "flex-1 cursor-pointer pb-[7px] text-center text-btn1",
            selectedTab === "mine" ? "text-black" : "text-gray-400"
          )}
        >
          내 메시지
        </div>
        <div
          onClick={() => setSelectedTab("found")}
          className={clsx(
            "flex-1 cursor-pointer pb-[7px] text-center text-btn1",
            selectedTab === "found" ? "text-black" : "text-gray-400"
          )}
        >
          발견한 메시지
        </div>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 380, damping: 40 }}
          className="absolute bottom-[-2px] h-[2px] w-[calc(50%-25px)] bg-black"
          style={{
            left: selectedTab === "mine" ? "calc(0% + 26px)" : "calc(50%)",
          }}
        />
      </div>

      <div className="mt-[10px] flex flex-col gap-[10px] px-6 pb-24">
        {selectedTab === "mine" &&
          messageData.map((message) => (
            <MineContainer key={message.id} {...message} />
          ))}
        {selectedTab === "found" &&
          messageData.map((message) => (
            <FoundContainer key={message.id} {...message} />
          ))}
      </div>
    </div>
  );
}
