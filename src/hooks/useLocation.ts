import { useEffect } from "react";

interface UseWatchPositionProps {
  setPosition: (_: { lat: number; lng: number }) => void;
  setHeading: (_: number) => void;
}

export function useWatchPosition({
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
        console.error(error);
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
