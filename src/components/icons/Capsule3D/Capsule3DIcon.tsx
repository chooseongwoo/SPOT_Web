import { Top, Bottom, Glow } from ".";

interface Capsule3DIconProps {
  width?: number;
  height?: number;
  rotation?: number;
  isOpen?: boolean;
  isGlow?: boolean;
}

export default function Capsule3DIcon({
  width = 138,
  height = 197,
  rotation = 0,
  isOpen = false,
  isGlow = false,
}: Capsule3DIconProps) {
  return (
    <div
      className="relative"
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
      <div
        className={`absolute top-0 z-50 transition-opacity duration-700 ${
          isGlow ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: "-1.2rem" }}
      >
        <Glow />
      </div>
    </div>
  );
}
