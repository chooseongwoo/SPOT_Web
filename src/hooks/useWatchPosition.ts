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

    let prevLat = 0;
    let prevLng = 0;

    const THRESHOLD = 0.00015; // 약 15m

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, heading } = pos.coords;
        const roundedLat = parseFloat(latitude.toFixed(6));
        const roundedLng = parseFloat(longitude.toFixed(6));

        if (
          Math.abs(prevLat - roundedLat) > THRESHOLD ||
          Math.abs(prevLng - roundedLng) > THRESHOLD
        ) {
          prevLat = roundedLat;
          prevLng = roundedLng;
          setPosition({ lat: roundedLat, lng: roundedLng });
          setHeading(heading ?? 0);
        }
      },
      () => {
        setPosition({ lat: 35.1681608, lng: 129.0573853 });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, [setPosition, setHeading]);
}
