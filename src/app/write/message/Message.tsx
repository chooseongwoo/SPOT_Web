"use client";

import AnonymousSelect from "../AnonymousSelect";
import Textarea from "../Textarea";
import { CloseTab, CustomButton } from "@/components";
import { useState } from "react";

export default function Message() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");

  return (
    <>
      <div className="w-full h-screen flex flex-col px-6">
        <CloseTab />
        <div className="flex flex-col gap-5">
          <AnonymousSelect
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
          />
          <Textarea
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            content={content}
            setContent={setContent}
          />
        </div>
      </div>
      <div className="absolute bottom-10 w-full px-6 flex gap-[10px]">
        <button className="p-[10px] w-[86px] text-black text-btn1 bg-white border border-gray-2 rounded-xl">
          이전
        </button>
        <CustomButton
          title="다음"
          onClick={() => {
            return 0;
          }}
        />
      </div>
    </>
  );
}
