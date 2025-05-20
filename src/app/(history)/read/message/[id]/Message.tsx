import { Header } from "@/components";
import { CalendarIcon, OutlinedLocationIcon } from "@/components/icons";
import Image from "next/image";

export default function Message() {
  return (
    <div className="flex flex-col">
      <Header title="메시지" />
      <div className="flex flex-col gap-3 px-6 pt-[10px]">
        <p className="text-b2 text-black">
          메세지내용입니다메세지내용입니다메세ㄹㄴㅇㄹㅇㄹㄹㄴㅇㄹㄴㅇㄹㅇㄹㄴㅇㄹㄹㅇㄴㄹㄴㅇㄹ
          ㄹㅇㄴㄹ ㄹㄴㅇㄹ ㅑ ㅓ ㅓ ㅓ ㅓ ㅓ ㅓ ㅓ ㅓ ㅓ ㅓ ㅓ
        </p>
        <div className="h-[2px] w-full bg-gray-1" />
        <div className="flex items-center gap-[10px]">
          <Image
            alt="프로필 이미지"
            src="/images/DefaultProfileImage.png"
            width={46}
            height={46}
            className="rounded-full border border-gray-2"
          />
          <p className="text-b2 text-black">추성우</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-[5px]">
            <CalendarIcon />
            <p className="text-footnote text-gray-4">
              2025년 5월 12일 12시 34분
            </p>
          </div>
          <div className="flex items-center gap-[5px]">
            <OutlinedLocationIcon />
            <p className="text-footnote text-gray-4">
              부산광역시 강서구 가락대로 1393
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
