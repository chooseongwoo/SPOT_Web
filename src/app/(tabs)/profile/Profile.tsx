"use client";

import { CameraIcon, ChevronIcon } from "@/components/icons";
import { useUploadImage } from "@/hooks";
import Image from "next/image";
import React, { useState } from "react";

export default function Profile() {
  const uploadImage = useUploadImage();
  const DefaultProfile = "/images/DefaultProfileImage.png";
  const [selectedImage, setSelectedImage] = useState<string>(DefaultProfile);

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
        <p className="text-b1 text-black">닉네임123</p>
        <button className="rounded-[20px] bg-white px-3 py-[10px] text-btn3 text-gray-4 shadow-[0px_2px_4px_0px_rgba(165,165,165,0.15)]">
          내 정보 수정
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-4 px-6">
        <div className="rounded-xl bg-white p-5">
          <p className="text-b3 text-gray-4">기록</p>
          <div className="flex items-center justify-between py-3">
            <p className="text-b2 text-gray-5">내가 남긴 기록</p>
            <ChevronIcon direction="right" size={18} />
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-b2 text-gray-5">발견한 기록</p>
            <ChevronIcon direction="right" size={18} />
          </div>
        </div>
        <div className="rounded-xl bg-white p-5">
          <p className="text-b3 text-gray-4">기타</p>
          <div className="flex items-center justify-between py-3">
            <p className="text-b2 text-gray-5">알림</p>
            <ChevronIcon direction="right" size={18} />
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-b2 text-gray-5">약관 및 개인정보 처리방침</p>
            <ChevronIcon direction="right" size={18} />
          </div>
          <div className="flex items-center justify-between py-3">
            <p className="text-b2 text-gray-5">고객센터</p>
            <ChevronIcon direction="right" size={18} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col gap-[7px]">
              <p className="text-b2 text-gray-5">현재 버전</p>
              <p className="text-cap1 text-green-default">1.0.0</p>
            </div>
            <p className="text-b3 text-gray-4">최신버전</p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-white p-5">
          <p className="py-3 text-b2 text-red">로그아웃</p>
          <p className="py-3 text-b2 text-red">회원탈퇴</p>
        </div>
      </div>
    </div>
  );
}
