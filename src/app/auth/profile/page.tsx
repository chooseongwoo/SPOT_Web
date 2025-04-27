"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomInput, CustomButton, Header } from "@/components/common";
import { CameraIcon } from "@/components/icons";
import useUploadImage from "@/hooks/useUploadImage";

const RegisterScreen = () => {
  const DefaultProfile = "/images/DefaultProfileImage.png";
  const [selectedImage, setSelectedImage] = useState<string>(DefaultProfile);
  const [username, setUsername] = useState<string>("");
  const uploadImage = useUploadImage();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="프로필 설정" />
      <div className="relative flex flex-1 flex-col items-center px-6 pb-2 pt-4">
        <div className="relative">
          <div className="relative size-20 overflow-hidden rounded-full border border-gray-200">
            <Image
              src={selectedImage}
              alt="Profile"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <button
            onClick={() => uploadImage(setSelectedImage)}
            className="absolute bottom-0 right-0 rounded-full border border-gray-200 bg-white p-1"
          >
            <CameraIcon />
          </button>
        </div>

        <div className="mt-6 w-full">
          <CustomInput
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={username}
            setValue={setUsername}
          />
        </div>

        <div className="absolute bottom-10 w-full px-6">
          <CustomButton
            title="완료"
            onClick={() => {
              return 0;
            }}
            disabled={!username || !selectedImage}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
