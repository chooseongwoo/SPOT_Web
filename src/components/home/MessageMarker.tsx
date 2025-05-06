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
    <div
      style={{
        backgroundColor: locked
          ? "gray"
          : type === "capsule"
          ? "blue"
          : "green",
        color: "white",
        padding: "4px 8px",
        borderRadius: "8px",
        fontSize: "12px",
        whiteSpace: "nowrap",
      }}
    >
      {locked ? "잠김" : type === "capsule" ? "타임캡슐" : "메시지"}
      <br />
      {remainTime}
    </div>
  );
}
