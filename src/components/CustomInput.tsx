"use client";

import { useState } from "react";
import clsx from "clsx";

interface InputProps {
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  setValue: (_: string) => void;
  formatter?: (_: string) => string;
}

export default function CustomInput({
  label,
  placeholder,
  type = "text",
  value,
  setValue,
  formatter,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatter ? formatter(raw) : raw;
    setValue(formatted);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-b2 text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "h-14 rounded-lg border px-4 py-2 text-b2 text-black outline-none placeholder:text-gray-3",
          isFocused ? "border-green-active" : "border-gray-2"
        )}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
