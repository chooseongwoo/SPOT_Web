"use client";

import { CloseTab, CustomButton, CustomInput } from "@/components";
import AnonymousSelect from "../AnonymousSelect";
import Textarea from "../Textarea";
import { useState } from "react";
import { useCreateCapsuleMutation } from "@/services/message/mutation";
import { useRouter } from "next/navigation";
import BackButton from "@/app/(history)/write/BackButton";
import { formatInputDate, formatInputTime } from "@/utils";

export default function Capsule() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [values, setValues] = useState<{
    date: string;
    time: string;
    content: string;
  }>({ date: "", time: "", content: "" });
  const router = useRouter();
  const { mutate: createCapsule } = useCreateCapsuleMutation();

  const handleValueChange = (
    field: "date" | "time" | "content",
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col px-6">
        <CloseTab />
        <div className="flex flex-col gap-5">
          <AnonymousSelect
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
          />
          <CustomInput
            label="날짜"
            placeholder="2025/01/01"
            value={values.date}
            setValue={(val) => handleValueChange("date", val)}
            formatter={formatInputDate}
          />
          <CustomInput
            label="시간"
            placeholder="13:00"
            value={values.time}
            setValue={(val) => handleValueChange("time", val)}
            formatter={formatInputTime}
          />
          <Textarea
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            content={values.content}
            setContent={(val) => handleValueChange("content", val)}
          />
        </div>
      </div>
      <div className="absolute bottom-10 flex w-full gap-[10px] px-6">
        <BackButton name="이전" />
        <CustomButton
          title="다음"
          disabled={!values.date || !values.time || !values.content}
          onClick={() => {
            const formattedDate = values.date.replace(/\//g, "-");
            const openAtDate = new Date(`${formattedDate}T${values.time}:00+09:00`);
            if (Number.isNaN(openAtDate.getTime())) {
              alert("잘못된 날짜 또는 시간입니다.");
              return;
            }
            const openAt = openAtDate.toISOString();
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                createCapsule(
                  {
                    content: values.content,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    open_at: openAt,
                    is_anonymous: isAnonymous,
                  },
                  {
                    onSuccess: (data) => {
                      router.push(`/write/result?id=${data.id}`);
                    },
                    onError: () => {
                      alert("타임캡슐 작성 실패");
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
