"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomInput, CustomButton, Header } from "@/components/common";
import { CameraIcon } from "@/components/icons";
import useUploadImage from "@/hooks/useUploadImage";
import { useUpdateUserMutation } from "@/services/user/mutation";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const DefaultProfile = "/images/DefaultProfileImage.png";
  const [selectedImage, setSelectedImage] = useState<string>(DefaultProfile);
  const [nickname, setNickname] = useState<string>("");
  const uploadImage = useUploadImage();
  const { mutate: updateUserMutate } = useUpdateUserMutation();

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
            value={nickname}
            setValue={setNickname}
          />
        </div>

        <div className="absolute bottom-10 w-full px-6">
          <CustomButton
            title="완료"
            onClick={() => {
              updateUserMutate(
                { nickname, profile_image_url: selectedImage },
                {
                  onSuccess: () => {
                    alert("프로필이 설정되었습니다.");
                    router.push("/");
                  },
                }
              );
            }}
            disabled={!nickname || !selectedImage}
          />
        </div>
      </div>
    </div>
  );
}
