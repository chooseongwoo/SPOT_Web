import { CapsuleIcon, ChevronIcon, MessageIcon } from "@/components/icons";

interface MessageItemProps {
  type: "message" | "capsule";
  read: boolean;
  open_at?: string | null;
}

export default function MessageItem({ type, read, open_at }: MessageItemProps) {
  const now = new Date();
  const openAt = open_at ? new Date(open_at) : null;
  const isLocked = openAt ? openAt.getTime() > now.getTime() : false;
  const remainTime = isLocked ? openAt!.getTime() - now.getTime() : null;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-[10px]">
        <div className="rounded-full border border-solid border-gray-1 p-[10px]">
          {type === "capsule" ? (
            <CapsuleIcon size={24} color={read ? "#C3C3C3" : "#2AD18E"} />
          ) : (
            <MessageIcon size={24} color={read ? "#C3C3C3" : "#2AD18E"} />
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-[5px]">
            <p className="text-b2 text-black">추성우</p>
            <p className="text-cap1 text-gray-3">3시간 전</p>
          </div>
          <p className="text-b3 text-gray-4">부산광역시 강서구 가락대로 1393</p>
        </div>
      </div>
      <ChevronIcon direction="right" color="#C3C3C3" />
    </div>
  );
}
