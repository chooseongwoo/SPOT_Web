import clsx from "clsx";
import { Top, Bottom } from "./Capsule3D";

interface Capsule3DIconProps {
  width?: number;
  height?: number;
  rotation?: number;
  isOpen?: boolean;
}

export default function Capsule3DIcon({
  width = 138,
  height = 197,
  rotation = 0,
  isOpen = false,
}: Capsule3DIconProps) {
  return (
    <div
      className={clsx("relative")}
      style={{ width, height, transform: `rotate(${rotation}deg)` }}
    >
      <div
        style={{
          transition: "transform 0.5s",
          transform: isOpen ? "translateY(-40px)" : "translateY(0)",
        }}
      >
        <Top />
      </div>
      <div className="absolute top-16">
        <Bottom />
      </div>
    </div>
  );
}
