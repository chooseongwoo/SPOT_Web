"use client";

import { useRef, useState } from "react";
import Cameraview from "@/app/(history)/read/capsule/[id]/CameraView";
import { CloseTab } from "@/components";
import {
  ArrowWardIcon,
  Capsule3DIcon,
  ClickIcon,
  ShadowIcon,
} from "@/components/icons";

export default function CapsuleDetail() {
  const touchStartY = useRef<number | null>(null);
  const [opened, setOpened] = useState(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY;

    if (distance > 200) {
      setOpened(true);
      console.log("타임캡슐 열림");
    }

    touchStartY.current = null;
  };

  return (
    <div className="h-screen w-full">
      <Cameraview />
      <div className="px-6 py-3">
        <CloseTab />
      </div>

      <div className="absolute left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <ArrowWardIcon />
          <ClickIcon />
        </div>
        <p className="text-t2 text-white">위로 밀어 타임캡슐을 열어보세요</p>
      </div>

      <div
        className="absolute bottom-2 left-1/2 flex -translate-x-1/2 touch-none flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Capsule3DIcon width={120} height={150} rotation={15} />
        <ShadowIcon />
      </div>
    </div>
  );
}
