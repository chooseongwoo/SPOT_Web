import { IconType } from "@/types";

export default function ClockIcon({ color, size }: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 12.5C2.5 6.97715 6.97715 2.5 12.5 2.5C18.0228 2.5 22.5 6.97715 22.5 12.5C22.5 18.0228 18.0228 22.5 12.5 22.5C6.97715 22.5 2.5 18.0228 2.5 12.5ZM13.398 8.01026C13.398 7.51433 12.9959 7.1123 12.5 7.1123C12.0041 7.1123 11.6021 7.51433 11.6021 8.01026V12.5001C11.6021 12.8003 11.7521 13.0807 12.0019 13.2472L15.3693 15.4921C15.7819 15.7672 16.3394 15.6557 16.6145 15.2431C16.8896 14.8304 16.7781 14.2729 16.3655 13.9978L13.398 12.0195V8.01026Z"
        fill={color}
      />
    </svg>
  );
}
