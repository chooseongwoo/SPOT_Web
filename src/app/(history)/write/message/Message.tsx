"use client";

import BackButton from "@/app/(history)/write/BackButton";
import AnonymousSelect from "../AnonymousSelect";
import Textarea from "../Textarea";
import { CloseTab, CustomButton } from "@/components";
import { useState } from "react";
import { useCreateMessageMutation } from "@/services/message/mutation";
import { useRouter } from "next/navigation";

export default function Message() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { mutate: createMessage } = useCreateMessageMutation();

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
        <BackButton name="이전" />
        <CustomButton
          title="다음"
          disabled={!content}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                createMessage(
                  {
                    content,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    is_anonymous: isAnonymous,
                  },
                  {
                    onSuccess: (data) => {
                      router.push(`/write/result?id=${data.id}`);
                    },
                    onError: () => {
                      alert("메시지 작성 실패");
                    },
                  }
                );
              },
              () => alert("위치 정보를 가져올 수 없습니다.")
            );
          }}
        />
      </div>
    </>
  );
}
