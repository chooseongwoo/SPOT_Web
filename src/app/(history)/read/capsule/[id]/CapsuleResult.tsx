import { CalendarIcon, OutlinedLocationIcon } from "@/components/icons";
import Image from "next/image";

export default function CapsuleResult() {
  return (
    <div className="flex w-full flex-col items-center gap-16 p-10">
      <div className="flex flex-col items-center gap-3">
        <Image
          alt="캡슐 결과 이미지"
          src="/images/CapsuleResultImage.png"
          width={128}
          height={160}
        />
        <p className="whitespace-pre-line text-wrap text-center text-t2 text-white">
          {"두근두근!\n타임캡슐이 열렸어요!"}
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-5">
        <div className="flex items-center gap-[10px]">
          <Image
            alt="프로필 이미지"
            src="/images/DefaultProfileImage.png"
            className="rounded-full"
            width={46}
            height={46}
          />
          <p className="text-b2 text-black">추성우</p>
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="flex items-center gap-[5px] text-footnote text-gray-4">
            <CalendarIcon />
            2025년 5월 12일 12시 34분
          </p>
          <p className="flex items-center gap-[5px] text-footnote text-gray-4">
            <OutlinedLocationIcon />
            부산광역시 강서구 가락대로 1393
          </p>
        </div>
        <div className="h-[2px] w-full bg-gray-1" />
        <p className="text-b2 text-black">
          타임캡슐 내용입니다타임캡슐 내용입니다타임캡슐 내용입니다타임캡슐
          내용입니다다타임캡슐 내용입니다타임캡슐 내용입니다타임캡슐
          내용입니다다타임캡슐 내용입니다타임캡슐 내용입니다타임캡슐 내용입니다
        </p>
      </div>
    </div>
  );
}
