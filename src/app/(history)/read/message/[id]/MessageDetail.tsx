"use client";

import { Header } from "@/components";
import { CalendarIcon, OutlinedLocationIcon } from "@/components/icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMessageQuery } from "@/services/message/query";
import { useReadMessageMutation } from "@/services/message/mutation";
import { useAddressQuery } from "@/services/map/location.query";

export default function MessageDetail() {
  const params = useParams<{ id: string }>();
  const { data: message } = useMessageQuery(params.id);
  const { mutate: readMessage } = useReadMessageMutation();
  const { data: address } = useAddressQuery(message?.lat ?? 0, message?.lng ?? 0);
  useEffect(() => {
    if (message) {
      readMessage(message.id);
    }
  }, [message, readMessage]);

  if (!message) return null;

  return (
    <div className="flex flex-col">
      <Header title="메시지" />
      <div className="flex flex-col gap-3 px-6 pt-[10px]">
        <p className="text-b2 text-black whitespace-pre-wrap">{message.content}</p>
        <div className="h-[2px] w-full bg-gray-1" />
        <div className="flex items-center gap-[10px]">
          <Image
            alt="프로필 이미지"
            src="/images/DefaultProfileImage.png"
            width={46}
            height={46}
            className="rounded-full border border-gray-2"
          />
          <p className="text-b2 text-black">{message.nickname}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-[5px]">
            <CalendarIcon />
            <p className="text-footnote text-gray-4">
              {new Date(message.created_at).toLocaleString("ko-KR")}
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
      </div>
    </div>
  );
}
