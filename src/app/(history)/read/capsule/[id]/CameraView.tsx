"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CanvasCameraView({
  isMounted,
}: {
  isMounted: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  useEffect(() => {
    let animationFrameId: number;
    let video: HTMLVideoElement | null = null;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });
        streamRef.current = stream;

        video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
          video.srcObject = stream;
          await video.play();

          const ctx = canvas.getContext("2d");

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const draw = () => {
            if (ctx && video!.videoWidth > 0 && video!.videoHeight > 0) {
              ctx.drawImage(video!, 0, 0, canvas.width, canvas.height);
            }
            animationFrameId = requestAnimationFrame(draw);
          };

          draw();
        }
      } catch (err) {
        alert(`카메라 접근 실패: ${err}`);
      }
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.pause();
        video.srcObject = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [router]);

  return (
    <div className="absolute inset-0">
      <video ref={videoRef} playsInline muted style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 z-0 size-full"
        style={{ objectFit: "cover" }}
      />
      {isMounted && (
        <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-sm" />
      )}
    </div>
  );
}
