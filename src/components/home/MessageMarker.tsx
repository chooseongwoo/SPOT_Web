import {
  CapsuleIcon,
  LockIcon,
  MarkerBackgroundIcon,
  MessageIcon,
} from "@/components/icons";
import { formatTime } from "@/utils";
import clsx from "clsx";

interface MessageMarkerProps {
  type: "message" | "capsule";
  read: boolean;
  open_at?: string | null;
}

export default function MessageMarker({
  type,
  read,
  open_at,
}: MessageMarkerProps) {
  const now = new Date();
  const openAt = open_at ? new Date(open_at) : null;
  const isLocked = openAt ? openAt.getTime() > now.getTime() : false;
  const remainTime = isLocked ? openAt!.getTime() - now.getTime() : null;

  return (
    <div className="relative h-[38px] w-[30px]">
      <div className={clsx("absolute", isLocked && "blur-[1px]")}>
        <MarkerBackgroundIcon read={isLocked ? true : read} />
      </div>
      <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
        {type === "message" ? (
          <MessageIcon color="#FFF" size={16} />
        ) : (
          <CapsuleIcon />
        )}
      </div>
      {isLocked && remainTime !== null && (
        <div className="absolute left-1/2 top-1 z-10 flex -translate-x-1/2 flex-col items-center">
          <LockIcon />
          <p className="text-cap2 text-gray-5">{formatTime(remainTime)}</p>
        </div>
      )}
    </div>
  );
}
