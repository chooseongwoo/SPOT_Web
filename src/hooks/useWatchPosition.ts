import { Position } from "@/types";
import { useEffect } from "react";

interface UseWatchPositionProps {
  setPosition: (_: Position) => void;
  setHeading: (_: number) => void;
}

export default function useWatchPosition({
  setPosition,
  setHeading,
}: UseWatchPositionProps) {
  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setHeading(pos.coords.heading ?? 0);
      },
      (error) => {
        // console.error("📡 위치 수신 실패:", {
        //   code: error.code,
        //   message: error.message,
        //   error,
        // });
        setPosition({ lat: 35.1681608, lng: 129.0573853 });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 60000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, [setPosition, setHeading]);
}
