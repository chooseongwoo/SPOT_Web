import {
  CapsuleIcon,
  LockIcon,
  MarkerBackgroundIcon,
  MessageIcon,
} from "@/components/icons";
import { useRemainTime } from "@/hooks";
import { formatRemainTime } from "@/utils";
import clsx from "clsx";

interface HistoryMarkerProps {
  type: "message" | "capsule";
  read: boolean;
  open_at?: string | null;
}

export default function HistoryMarker({
  type,
  read,
  open_at,
}: HistoryMarkerProps) {
  const { remainTime, isLocked } = useRemainTime(open_at!);

  return (
    <div className="relative h-[38px] w-[30px]">
      <div className={clsx("absolute", isLocked && "blur-[1px]")}>
        <MarkerBackgroundIcon read={isLocked ? true : read} />
      </div>
      <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
        {type === "message" ? (
          <MessageIcon color="#FFF" size={16} />
        ) : (
          <CapsuleIcon size={16} />
        )}
      </div>
      {isLocked && remainTime !== null && (
        <div className="absolute left-1/2 top-1 z-10 flex -translate-x-1/2 flex-col items-center">
          <LockIcon />
          <p className="text-cap2 text-gray-5" suppressHydrationWarning>
            {formatRemainTime(remainTime)}
          </p>
        </div>
      )}
    </div>
  );
}
