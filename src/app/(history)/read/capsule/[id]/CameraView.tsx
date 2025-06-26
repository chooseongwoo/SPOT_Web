"use client";

import { useEffect, useRef } from "react";

export default function Cameraview({ isMounted }: { isMounted: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: "environment" } } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("카메라 접근 실패:", err);
      });
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="size-full object-cover"
      />
      {isMounted && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      )}
    </div>
  );
}
