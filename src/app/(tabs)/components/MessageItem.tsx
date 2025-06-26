import {
  CapsuleIcon,
  ChevronIcon,
  LockIcon,
  MessageIcon,
} from "@/components/icons";
import { useRemainTime } from "@/hooks";
import { formatRemainTime } from "@/utils";

import MessageType from "@/types/message.type";

interface MessageItemProps {
  message: MessageType;
  onClick?: () => void;
}

export default function MessageItem({ message, onClick }: MessageItemProps) {
  const { remainTime, isLocked } = useRemainTime(message.open_at!);
  const type = message.is_time_capsule ? "capsule" : "message";

  return (
    <div className="flex w-full items-center justify-between" onClick={onClick}>
      <div className="flex w-full gap-[10px]">
        <div className="rounded-full border border-solid border-gray-1 p-[10px]">
          {type === "capsule" ? (
            <CapsuleIcon
              size={24}
              color={
                isLocked ? "#C3C3C3" : message.read ? "#C3C3C3" : "#2AD18E"
              }
            />
          ) : (
            <MessageIcon
              size={24}
              color={message.read ? "#C3C3C3" : "#2AD18E"}
            />
          )}
        </div>
        <div className="relative flex w-full items-center justify-between">
          {isLocked && (
            <div className="absolute z-50 flex items-center gap-1 py-[11px]">
              <LockIcon size={24} />
              <p className="text-btn1 text-gray-4" suppressHydrationWarning>
                {formatRemainTime(remainTime)}
              </p>
            </div>
          )}
          <div className="flex w-full flex-col">
            <p className="truncate text-b2 text-black">{message.nickname}</p>
            <p className="text-cap1 text-gray-3">
              {new Date(message.created_at).toLocaleString()}
            </p>
          </div>
          <ChevronIcon direction="right" color="#C3C3C3" />
          {isLocked && (
            <div className="absolute inset-0 z-0 bg-white/60 backdrop-blur-[2.5px]" />
          )}
        </div>
      </div>
    </div>
  );
}
