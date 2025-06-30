import { CalendarIcon, OutlinedLocationIcon } from "@/components/icons";
import Image from "next/image";
import HistoryType from "@/types/history.type";
import { useAddressQuery } from "@/services/map/location.query";

export default function CapsuleResult({ message }: { message: HistoryType }) {
  const { data: address } = useAddressQuery(message.lat, message.lng);
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
          <p className="text-b2 text-black">{message.nickname}</p>
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="flex items-center gap-[5px] text-footnote text-gray-4">
            <CalendarIcon />
            {new Date(message.created_at).toLocaleString("ko-KR")}
          </p>
          {address && (
            <p className="flex items-center gap-[5px] text-footnote text-gray-4">
              <OutlinedLocationIcon />
              {address.formatted_address}
            </p>
          )}
        </div>
        <div className="h-[2px] w-full bg-gray-1" />
        <p className="whitespace-pre-wrap text-b2 text-black">
          {message.content}
        </p>
      </div>
    </div>
  );
}
