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
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          const ctx = canvasRef.current?.getContext("2d");
          const draw = () => {
            if (ctx && videoRef.current) {
              ctx.drawImage(
                videoRef.current,
                0,
                0,
                canvasRef.current!.width,
                canvasRef.current!.height
              );
              requestAnimationFrame(draw);
            }
          };
          draw();
        }
      } catch (err) {
        alert(`카메라 접근 실패: ${err}`);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="absolute inset-0">
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} className="absolute inset-0 z-0 size-full" />
      {isMounted && (
        <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-sm" />
      )}
    </div>
  );
}
