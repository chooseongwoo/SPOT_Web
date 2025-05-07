import { MarkerBackgroundIcon } from "@/components/icons";

interface MessageMarkerProps {
  type: "message" | "capsule";
  read: boolean;
  locked?: boolean;
  remainTime?: string;
}

export default function MessageMarker({
  type,
  read,
  locked,
  remainTime,
}: MessageMarkerProps) {
  return (
    <div className="relative">
      <MarkerBackgroundIcon read={read} />
      {type === "capsule" && (
        <
      )}
    </div>
  );
}
