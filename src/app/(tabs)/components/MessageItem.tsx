import {
  CapsuleIcon,
  ChevronIcon,
  LockIcon,
  MessageIcon,
} from "@/components/icons";
import { useRemainTime } from "@/hooks";
import { formatRemainTime } from "@/utils";

interface MessageItemProps {
  type: "message" | "capsule";
  read: boolean;
  open_at?: string | null;
}

export default function MessageItem({ type, read, open_at }: MessageItemProps) {
  const { remainTime, isLocked } = useRemainTime(open_at!);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full gap-[10px]">
        <div className="rounded-full border border-solid border-gray-1 p-[10px]">
          {type === "capsule" ? (
            <CapsuleIcon
              size={24}
              color={isLocked ? "#C3C3C3" : read ? "#C3C3C3" : "#2AD18E"}
            />
          ) : (
            <MessageIcon size={24} color={read ? "#C3C3C3" : "#2AD18E"} />
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
            <div className="flex items-center gap-[5px]">
              <p className="text-b2 text-black">추성우</p>
              <p className="text-cap1 text-gray-3">3시간 전</p>
            </div>
            <p className="text-b3 text-gray-4">
              부산광역시 강서구 가락대로 1393
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
