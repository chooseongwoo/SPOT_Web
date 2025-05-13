"use client";

import { CloseTab, CustomButton } from "@/components";
import AnonymousSelect from "../AnonymousSelect";
import Textarea from "../Textarea";
import { useState } from "react";
import BackButton from "@/app/write/BackButton";

export default function Capsule() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");

  return (
    <>
      <div className="flex h-screen w-full flex-col px-6">
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
      <div className="absolute bottom-10 flex w-full gap-[10px] px-6">
        <BackButton />
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
