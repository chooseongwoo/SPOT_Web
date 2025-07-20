"use client";

import { Header } from "@/components";
import {
  CalendarIcon,
  ChatIcon,
  OutlinedLocationIcon,
} from "@/components/icons";
import Image from "next/image";
import { useAddressQuery } from "@/services/map/location.query";
import HistoryType from "@/types/history.type";
import ReactionButton from "./ReactionButton";
import Comments from "./Comments";
import { formatToKST } from "@/utils";

interface MessageDetailContentProps {
  message: HistoryType;
}

export default function MessageDetailContent({
  message,
}: MessageDetailContentProps) {
  const { data: address } = useAddressQuery(
    message?.lat ?? 0,
    message?.lng ?? 0
  );

  return (
    <div className="flex flex-col">
      <Header title="메시지" />
      <div className="flex flex-col gap-3 px-6 pt-[10px]">
        <p className="whitespace-pre-wrap text-b2 text-black">
          {message.content}
        </p>
        <div className="h-[2px] w-full bg-gray-1" />
        <div className="flex items-center gap-[10px]">
          <Image
            alt="프로필 이미지"
            src={message.users.profile_image_url}
            width={46}
            height={46}
            className="rounded-full border border-gray-2"
          />
          <p className="text-b2 text-black">{message.users.nickname}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-[5px]">
            <CalendarIcon />
            <p className="text-footnote text-gray-4">
              {formatToKST(message.created_at, "YYYY.MM.DD A h시 mm분")}
            </p>
          </div>
          {address && (
            <div className="flex items-center gap-[5px]">
              <OutlinedLocationIcon />
              <p className="text-footnote text-gray-4">
                {address.formatted_address}
              </p>
            </div>
          )}
        </div>
        <div className="h-[2px] w-full bg-gray-1" />
        <div className="flex w-full items-center justify-around">
          <ReactionButton
            message_id={message.id}
            reactions={message.reactions || []}
          />
          <div className="flex items-center gap-1">
            <ChatIcon size={20} color="#B0B0B0" />
            <span>{message.comments?.length || 0}</span>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-1" />
        <div className="h-1/3 w-full">
          <Comments message_id={message.id} comments={message.comments || []} />
        </div>
      </div>
    </div>
  );
}
