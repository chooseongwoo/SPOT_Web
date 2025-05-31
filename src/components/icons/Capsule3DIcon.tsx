import clsx from "clsx";
import { Top, Bottom } from "./Capsule3D";

export default function Capsule3DIcon({
  width = 138,
  height = 197,
  rotation = 0,
}: {
  width?: number;
  height?: number;
  rotation?: number;
}) {
  return (
    <div
      className={clsx("relative")}
      style={{ width, height, transform: `rotate(${rotation}deg)` }}
    >
      <Top />
      <div className="absolute top-16">
        <Bottom />
      </div>
    </div>
  );
}
