"use client";

import { CameraIcon } from "@/components/icons";
import { useUploadImage } from "@/hooks";
import Image from "next/image";
import React, { useState } from "react";

export default function Profile() {
  const uploadImage = useUploadImage();
  const DefaultProfile = "/images/DefaultProfileImage.png";
  const [selectedImage, setSelectedImage] = useState<string>(DefaultProfile);

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="fixed flex w-full flex-col bg-white">
        <div className="flex w-full justify-start px-6 py-3">
          <p className="text-headline text-black">프로필</p>
        </div>
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
        <p className="text-b1 text-black">닉네임123</p>
        <button className="rounded-[20px] bg-white px-3 py-[10px] text-btn3 text-gray-4 shadow-[0px_2px_4px_0px_rgba(165,165,165,0.15)]">
          내 정보 수정
        </button>
      </div>
    </div>
  );
}
