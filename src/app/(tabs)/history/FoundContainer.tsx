"use client";

import {
  CalendarIcon,
  CapsuleIcon,
  MessageIcon,
  OutlinedLocationIcon,
  TrashIcon,
} from "@/components/icons";
import { useAddressQuery } from "@/services/map/location.query";
import { HistoryType } from "@/types";
import { extractCleanAddress, formatToKST } from "@/utils";
import Image from "next/image";

export default function FoundContainer(message: HistoryType) {
  const { data: currentLocation } = useAddressQuery(message.lat, message.lng);
  return (
    <div className="flex flex-col gap-2 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="flex size-8 items-center justify-center rounded-lg bg-green-default">
            {message.is_time_capsule ? (
              <CapsuleIcon size={18} />
            ) : (
              <MessageIcon size={18} />
            )}
          </div>
          <p className="text-btn2 text-black">
            {message.is_time_capsule ? "타임캡슐" : "메시지"}
          </p>
        </div>
        <TrashIcon />
      </div>
      <div className="flex items-center gap-[5px]">
        <CalendarIcon />
        <p className="text-footnote text-gray-4">
          {formatToKST(message.created_at, "YYYY.MM.DD A h시 mm분")}
        </p>
      </div>
      <div className="flex items-center gap-[5px]">
        <OutlinedLocationIcon />
        <p className="text-footnote text-gray-4">
          {extractCleanAddress(currentLocation?.address_components)}
        </p>
      </div>
      <p className="break-words text-b2 text-black">{message.content}</p>
      <div className="flex items-center gap-[10px]">
        <Image
          alt="프로필 이미지"
          src={message.users.profile_image_url}
          className="aspect-square rounded-full object-cover"
          width={24}
          height={24}
        />
        <p className="text-b3 text-black">
          {message.is_anonymous ? "익명" : message.users.nickname}
        </p>
      </div>
    </div>
  );
}
