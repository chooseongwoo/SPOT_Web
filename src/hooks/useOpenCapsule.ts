import { useRef, useState, useCallback } from "react";

const MAX_DRAG_DISTANCE = 250;

const useOpenCapsule = () => {
  const touchStartY = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const [opened, setOpened] = useState(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      touchStartY.current = e.touches[0].clientY;
    },
    []
  );

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.touches[0].clientY;
    const distance = touchEndY - touchStartY.current;

    if (distance < 0) {
      setDragY(Math.max(distance, -MAX_DRAG_DISTANCE));
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartY.current === null) return;

    if (Math.abs(dragY) >= MAX_DRAG_DISTANCE) {
      setOpened(true);
    }

    touchStartY.current = null;
    setDragY(0);
  }, [dragY]);

  return {
    dragY,
    opened,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setDragY,
  };
};

export default useOpenCapsule;
