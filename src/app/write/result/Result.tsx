"use client";

import BackButton from "@/app/write/BackButton";
import { CloseTab, CustomButton } from "@/components";
import { FilledLocationIcon, MessageIcon } from "@/components/icons";

export default function Result() {
  return (
    <>
      <div className="flex h-screen w-full flex-col px-6">
        <CloseTab />
        <div className="mt-60 flex w-full flex-col items-center gap-5">
          <div className="rounded-full border border-gray-2 bg-white p-[10px]">
            <MessageIcon size={42} color="#2AD18E" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-headline text-black">메시지를 남깁니다.</p>
            <p className="text-b2 text-gray-4">2025년 5월 12일 12시 34분</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 flex w-full flex-col gap-5 px-6">
        <div className="flex items-center justify-center gap-1">
          <FilledLocationIcon />
          <p className="text-footnote text-gray-5">
            <span className="text-green-default">부산광역시 강서구 봉림동</span>
            에 위치해 있습니다.
          </p>
        </div>
        <div className="flex gap-[10px]">
          <BackButton name="수정" />
          <CustomButton title="완료" onClick={() => {}} />
        </div>
      </div>
    </>
  );
}
