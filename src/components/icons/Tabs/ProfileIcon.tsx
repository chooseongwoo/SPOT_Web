import { IconType } from "@/types";
import React from "react";

const ProfileIcon = ({ color }: IconType) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <g id="icon_profile">
        <g id="vector">
          <path
            d="M11.9999 3.1001C8.90711 3.1001 6.3999 5.6073 6.3999 8.7001C6.3999 11.7929 8.90711 14.3001 11.9999 14.3001C15.0927 14.3001 17.5999 11.7929 17.5999 8.7001C17.5999 5.6073 15.0927 3.1001 11.9999 3.1001Z"
            fill={color}
          />
          <path
            d="M11.9999 15.1001C6.80842 15.1001 3.3999 17.9293 3.3999 21.7001C3.3999 22.0315 3.66853 22.3001 3.9999 22.3001H19.9999C20.3313 22.3001 20.5999 22.0315 20.5999 21.7001C20.5999 17.9293 17.1914 15.1001 11.9999 15.1001Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default ProfileIcon;
