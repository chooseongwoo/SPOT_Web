"use client";

import { CameraIcon, ChevronIcon } from "@/components/icons";
import { profileSections } from "@/constants";
import { useUploadImage } from "@/hooks";
import {
  useDeleteUserMutation,
  useSignOutMutation,
} from "@/services/user/mutation";
import { useUserInfoQuery } from "@/services/user/query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const uploadImage = useUploadImage();
  const DefaultProfile = "/images/DefaultProfileImage.png";
  const [selectedImage, setSelectedImage] = useState<string>(DefaultProfile);
  const { data: userInfo } = useUserInfoQuery();
  const { mutate: signOut } = useSignOutMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const actionMap: Record<string, () => void> = {
    signOut,
    deleteUser,
  };

  useEffect(() => {
    if (userInfo?.profile_image_url) {
      setSelectedImage(userInfo.profile_image_url);
    }
  }, [userInfo]);

  return (
    <div className="flex w-full flex-col bg-gray-1 pb-[110px]">
      <div className="fixed z-50 flex w-full justify-start bg-gray-1 px-6 py-3">
        <p className="text-headline text-black">프로필</p>
      </div>
      <div className="mt-12 flex w-full flex-col items-center gap-4">
        <div className="relative size-20 overflow-hidden">
          <Image
            src={selectedImage}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full border border-gray-200"
          />
          <button
            onClick={() => uploadImage(setSelectedImage)}
            className="absolute bottom-0 right-0 rounded-full border border-gray-200 bg-white p-1"
          >
            <CameraIcon />
          </button>
        </div>
        <p className="text-b1 text-black">{userInfo?.nickname ?? "..."}</p>
        <button className="rounded-[20px] bg-white px-3 py-[10px] text-btn3 text-gray-4 shadow-[0px_2px_4px_0px_rgba(165,165,165,0.15)]">
          내 정보 수정
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-4 px-6">
        {profileSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="rounded-xl bg-white p-5">
            {section.title && (
              <p className="text-b3 text-gray-4">{section.title}</p>
            )}
            {section.items.map((item, idx) =>
              "custom" in item ? (
                <React.Fragment key={idx}>{item.custom}</React.Fragment>
              ) : (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3"
                  onClick={() => {
                    if ("actionKey" in item && item.actionKey) {
                      actionMap[item.actionKey]?.();
                    }
                  }}
                >
                  <p className={`text-b2 ${item.className ?? "text-gray-5"}`}>
                    {item.label}
                  </p>
                  {item.showChevron && (
                    <ChevronIcon direction="right" size={18} />
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
