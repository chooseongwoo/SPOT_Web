"use client";

import { useEffect, useRef } from "react";

export default function CanvasCameraView({
  isMounted,
}: {
  isMounted: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
          video.srcObject = stream;
          await video.play();

          const ctx = canvas.getContext("2d");

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const draw = () => {
            if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0">
      <video ref={videoRef} style={{ display: "none" }} playsInline muted />
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
