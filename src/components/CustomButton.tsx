"use client";

import clsx from "clsx";

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const CustomButton = ({ title, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex h-14 w-full items-center justify-center rounded-xl p-[10px]",
        disabled ? "cursor-not-allowed bg-gray-3" : "bg-green-default"
      )}
    >
      <span className={clsx("text-btn1 text-white")}>{title}</span>
    </button>
  );
};

export default CustomButton;
