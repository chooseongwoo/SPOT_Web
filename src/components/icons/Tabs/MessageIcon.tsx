import { IconType } from "@/types";

const IconMessage = ({ color, size = 25 }: IconType) => {
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <g id="icon_invite">
        <path
          id="vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 6.5C1.5 4.84315 2.84315 3.5 4.5 3.5H20.5C22.1569 3.5 23.5 4.84315 23.5 6.5V18.5C23.5 20.1569 22.1569 21.5 20.5 21.5H4.5C2.84315 21.5 1.5 20.1569 1.5 18.5V6.5ZM5.965 8.84927C5.60547 8.59246 5.10583 8.67574 4.84903 9.03527C4.59222 9.3948 4.67549 9.89444 5.03502 10.1512L12.035 15.1512C12.3132 15.3499 12.6868 15.3499 12.965 15.1512L19.965 10.1512C20.3245 9.89444 20.4078 9.3948 20.151 9.03527C19.8942 8.67574 19.3946 8.59246 19.035 8.84927L12.5 13.5171L5.965 8.84927Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IconMessage;
