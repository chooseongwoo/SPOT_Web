import {
  CapsuleIcon,
  ChevronIcon,
  LockIcon,
  MessageIcon,
} from "@/components/icons";
import { useRemainTime } from "@/hooks";
import { useAddressQuery } from "@/services/map/location.query";
import { extractCleanAddress, formatRemainTime, formatTimeAgo } from "@/utils";

import { HistoryType } from "@/types";

interface HistoryItemProps {
  history: HistoryType;
  onClick?: () => void;
}

export default function HistoryItem({ history, onClick }: HistoryItemProps) {
  const { remainTime, isLocked } = useRemainTime(history.open_at!);
  const type = history.is_time_capsule ? "capsule" : "message";
  const { data: address } = useAddressQuery(history.lat, history.lng);

  return (
    <div className="flex w-full items-center justify-between" onClick={onClick}>
      <div className="flex w-full gap-[10px]">
        <div className="rounded-full border border-solid border-gray-1 p-[10px]">
          {type === "capsule" ? (
            <CapsuleIcon
              size={24}
              color={
                isLocked ? "#C3C3C3" : history.read ? "#C3C3C3" : "#2AD18E"
              }
            />
          ) : (
            <MessageIcon
              size={24}
              color={history.read ? "#C3C3C3" : "#2AD18E"}
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
          <div>
            <div className="flex w-full items-center gap-[5px]">
              <p className="truncate text-b2 text-black">
                {history.is_anonymous ? "익명의 누군가" : history.nickname}
              </p>
              <p className="text-cap1 text-gray-3" suppressHydrationWarning>
                {formatTimeAgo(history.created_at)}
              </p>
            </div>
            <p className="text-b3 text-gray-4">
              {extractCleanAddress(address?.address_components)}
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
