"use client";

import BackButton from "@/app/(history)/write/BackButton";
import AnonymousSelect from "../AnonymousSelect";
import Textarea from "../Textarea";
import { CloseTab, CustomButton } from "@/components";
import { useState } from "react";
import { useCreateMessageMutation } from "@/services/message/mutation";
import { useRouter } from "next/navigation";
import useUploadImage from "@/hooks/useUploadImage";
import { CameraIcon } from "@/components/icons";
import Image from "next/image";

export default function Message() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: createMessage } = useCreateMessageMutation();
  const { uploadImage, loading } = useUploadImage();

  const handleImageUpload = () => {
    uploadImage((url) => {
      setImageUrl(url);
    });
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col px-6">
        <CloseTab />
        <div className="flex flex-col gap-5">
          <AnonymousSelect
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
          />
          <Textarea
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            content={content}
            setContent={setContent}
          />
          <div className="flex flex-col gap-2">
            <p className="text-b2 text-black">이미지</p>
            <div className="flex items-center gap-2">
              {!loading && !imageUrl && (
                <button
                  onClick={handleImageUpload}
                  className="flex h-24 w-full items-center justify-center rounded-xl bg-gray-100"
                >
                  <CameraIcon size={40} />
                </button>
              )}

              {loading ? (
                <div className="flex h-24 w-full items-center justify-center rounded-xl bg-gray-100">
                  <span className="text-gray-500">이미지 업로드 중...</span>
                </div>
              ) : imageUrl ? (
                <Image
                  onClick={handleImageUpload}
                  src={imageUrl}
                  alt="업로드된 이미지 미리보기"
                  width={800}
                  height={400}
                  sizes="100vw"
                  className="h-[400px] w-full rounded-lg object-cover"
                  priority
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 flex w-full gap-[10px] px-6">
        <BackButton name="이전" />
        <CustomButton
          title="다음"
          disabled={!(content && imageUrl)}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                createMessage(
                  {
                    content,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    is_anonymous: isAnonymous,
                    image_url: imageUrl || undefined,
                  },
                  {
                    onSuccess: (data) => {
                      router.push(`/write/result?id=${data.id}`);
                    },
                    onError: () => {
                      alert("메시지 작성 실패");
                    },
                  }
                );
              },
              () => alert("위치 정보를 가져올 수 없습니다.")
            );
          }}
        />
      </div>
    </>
  );
}
