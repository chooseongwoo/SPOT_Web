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
        "flex h-14 w-full items-center justify-center rounded-xl",
        disabled
          ? "cursor-not-allowed bg-gray-300"
          : "bg-green-500 hover:bg-green-600"
      )}
    >
      <span
        className={clsx("text-btn1", disabled ? "text-gray-500" : "text-white")}
      >
        {title}
      </span>
    </button>
  );
};

export default CustomButton;
