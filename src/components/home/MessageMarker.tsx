import {
  CapsuleIcon,
  MarkerBackgroundIcon,
  MessageIcon,
} from "@/components/icons";
import { formatTime } from "@/utils";

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
      <div className="absolute">
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
        <p className="absolute left-1/2 top-6 z-10 -translate-x-1/2 text-cap2 text-gray-5">
          {formatTime(remainTime)}
        </p>
      )}
    </div>
  );
}
