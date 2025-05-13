import { CapsuleIcon, MessageIcon } from "@/components/icons";
import clsx from "clsx";

export default function HistoryTypeContainer({
  type,
  isSelected,
  onClick,
}: {
  type: "message" | "capsule";
  isSelected: boolean;
  onClick: () => void;
}) {
  const iconSize = 36;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-between cursor-pointer border px-2 w-28 py-6 rounded-xl",
        isSelected ? "border-green-default bg-green-light" : "border-gray-200"
      )}
    >
      {type === "message" ? (
        <MessageIcon
          size={iconSize}
          color={isSelected ? "#2AD18E" : "#C3C3C3"}
        />
      ) : (
        <CapsuleIcon
          size={iconSize}
          color={isSelected ? "#2AD18E" : "#C3C3C3"}
        />
      )}
      <span
        className={clsx(
          "text-footnote",
          isSelected ? "text-green-default" : "text-gray-4"
        )}
      >
        {type === "message" ? "메시지" : "타임캡슐"}
      </span>
    </div>
  );
}
