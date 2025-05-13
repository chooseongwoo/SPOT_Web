"use client";

import { CloseTab, CustomButton, CustomInput } from "@/components";
import AnonymousSelect from "../AnonymousSelect";
import Textarea from "../Textarea";
import { useState } from "react";
import BackButton from "@/app/write/BackButton";
import { formatInputDate, formatInputTime } from "@/utils";

export default function Capsule() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [values, setValues] = useState<{
    date: string;
    time: string;
    content: string;
  }>({ date: "", time: "", content: "" });

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
        <BackButton />
        <CustomButton
          title="다음"
          disabled={!values.date || !values.time || !values.content}
          onClick={() => {
            return 0;
          }}
        />
      </div>
    </>
  );
}
