"use client";

import { CloseTab, CustomButton } from "@/components";
import { Checked, Unchecked } from "@/components/icons";
import clsx from "clsx";
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
          <div className="flex flex-col gap-2">
            <p className="text-black text-b2">익명 여부</p>
            <div className="flex gap-20">
              <div
                className="flex gap-[5px] items-center cursor-pointer"
                onClick={() => setIsAnonymous(true)}
              >
                {isAnonymous === true ? <Checked /> : <Unchecked />}
                <p className="text-black text-b2">익명</p>
              </div>
              <div
                className="flex gap-[5px] items-center cursor-pointer"
                onClick={() => setIsAnonymous(false)}
              >
                {isAnonymous === false ? <Checked /> : <Unchecked />}
                <p className="text-black text-b2">닉네임</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black text-b2">내용</p>
            <textarea
              placeholder="이곳에 남기고 싶은 이야기를 적어보세요!"
              className={clsx(
                "py-[10px] px-4 border outline-none rounded-xl bg-white h-[150px]",
                isFocused ? "border-green-active" : "border-gray-2"
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={200}
            />
            <p className="text-gray-3 text-footnote text-end">
              {content.length}/200
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 w-full px-6 flex gap-[10px]">
        <button className="p-[10px] w-[86px] bg-white border border-gray-2 rounded-xl">
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
