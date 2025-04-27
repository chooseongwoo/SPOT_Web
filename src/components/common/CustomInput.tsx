"use client";

import { useState } from "react";
import clsx from "clsx";

interface InputProps {
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
}

const CustomInput = ({ label, placeholder, type = "text" }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-b2 text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "h-14 rounded-lg border px-4 py-2 text-b2 text-black",
          isFocused ? "border-green-500" : "border-gray-300"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default CustomInput;
