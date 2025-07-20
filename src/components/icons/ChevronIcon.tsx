import { IconType } from "@/types";
import clsx from "clsx";
import { SVGProps } from "react";

export default function ChevronIcon({
  direction = "left",
  size = 24,
  color = "#222",
  ...props
}: IconType & SVGProps<SVGSVGElement>) {
  const rotationClass = clsx({
    "rotate-0": direction === "left",
    "rotate-180": direction === "right",
    "rotate-90": direction === "up",
    "-rotate-90": direction === "down",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rotationClass + " transition-transform"}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.665 3.225C16.965 3.525 16.965 4.015 16.665 4.315L8.985 11.995L16.665 19.675C16.965 19.975 16.965 20.465 16.665 20.765C16.365 21.065 15.875 21.065 15.575 20.765L7.345 12.545C7.045 12.245 7.045 11.755 7.345 11.455L15.565 3.225C15.865 2.925 16.355 2.925 16.655 3.225H16.665Z"
        fill={color}
      />
    </svg>
  );
}
