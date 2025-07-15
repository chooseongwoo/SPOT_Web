"use client";

import { useEffect, useRef } from "react";

export default function CameraView({ isMounted }: { isMounted: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert(`카메라 접근 실패, ${err}`);
      }
    };

    const stopCamera = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    startCamera();

    const handleVisibilityChange = () => {
      const stream = streamRef.current;
      if (
        document.visibilityState === "visible" &&
        (!stream || !stream.active)
      ) {
        startCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopCamera();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="size-full object-cover"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          zIndex: 0,
          position: "relative",
        }}
      />
      {isMounted && (
        <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-sm" />
      )}
    </div>
  );
}
