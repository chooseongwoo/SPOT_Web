"use client";

import BackButton from "@/app/(history)/write/BackButton";
import { CloseTab, CustomButton } from "@/components";
import { FilledLocationIcon, MessageIcon, CapsuleIcon } from "@/components/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { useMessageQuery } from "@/services/message/query";
import { useAddressQuery } from "@/services/map/location.query";

export default function Result() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id") ?? "";
  const { data: message } = useMessageQuery(id);
  const { data: address } = useAddressQuery(message?.lat ?? 0, message?.lng ?? 0);

  if (!message) return null;

  const Icon = message.is_time_capsule ? CapsuleIcon : MessageIcon;

  return (
    <>
      <div className="flex h-screen w-full flex-col px-6">
        <CloseTab />
        <div className="mt-60 flex w-full flex-col items-center gap-5">
          <div className="rounded-full border border-gray-2 bg-white p-[10px]">
            <Icon size={42} color="#2AD18E" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-headline text-black">{message.content}</p>
            <p className="text-b2 text-gray-4">
              {new Date(message.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 flex w-full flex-col gap-5 px-6">
        <div className="flex items-center justify-center gap-1">
          <FilledLocationIcon />
          {address && (
            <p className="text-footnote text-gray-5">
              <span className="text-green-default">
                {address.address_components[1]?.long_name ?? ""}
              </span>
              에 위치해 있습니다.
            </p>
          )}
        </div>
        <div className="flex gap-[10px]">
          <BackButton name="수정" />
          <CustomButton title="완료" onClick={() => router.push("/")} />
        </div>
      </div>
    </>
  );
}
