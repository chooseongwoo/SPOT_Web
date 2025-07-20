import {
  CalendarIcon,
  OutlinedLocationIcon,
  ChatIcon,
} from "@/components/icons";
import Image from "next/image";
import { HistoryType } from "@/types";
import { useAddressQuery } from "@/services/map/location.query";
import { formatToKST } from "@/utils";
import ReactionButton from "../../message/[id]/ReactionButton";
import Comments from "../../message/[id]/Comments";

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
            src={message.users.profile_image_url}
            className="aspect-square rounded-full object-cover"
            width={46}
            height={46}
          />
          <p className="text-b2 text-black">{message.users.nickname}</p>
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="flex items-center gap-[5px] text-footnote text-gray-4">
            <CalendarIcon />
            {formatToKST(message.created_at, "YYYY.MM.DD. A h시 mm분")}
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
        <div className="mt-4 flex w-full items-center justify-around border-t border-gray-200 py-2">
          <ReactionButton
            message_id={message.id}
            reactions={message.reactions || []}
          />
          <div className="flex items-center gap-x-1">
            <ChatIcon width={20} height={20} />
            <span>{message.comments?.length || 0}</span>
          </div>
        </div>
        <div className="w-full border-t border-gray-200">
          <Comments message_id={message.id} comments={message.comments || []} />
        </div>
      </div>
    </div>
  );
}
