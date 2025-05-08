"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BottomSheetProps {
  children: React.ReactNode;
  height: number;
  minHeight: number;
  maxHeight: number;
}

export default function BottomSheet({
  children,
  height,
  minHeight,
  maxHeight,
}: BottomSheetProps) {
  const [heightValue, setHeightValue] = useState(height);
  const [isDragging, setIsDragging] = useState(false);
  const [maxHeightValue, setMaxHeightValue] = useState(maxHeight);
  const dragStartY = useRef<number>(0);
  const startHeight = useRef<number>(height);

  useEffect(() => {
    setMaxHeightValue(maxHeight || window.innerHeight * 0.8);
  }, [maxHeight]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
    startHeight.current = heightValue;
  };

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaY = dragStartY.current - currentY;
      const newHeight = Math.min(
        Math.max(startHeight.current + deltaY, minHeight),
        maxHeightValue || window.innerHeight * 0.8
      );

      setHeightValue(newHeight);
    },
    [isDragging, maxHeightValue, minHeight]
  );

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDrag]);

  useEffect(() => {
    setHeightValue(height);
  }, [height]);

  return (
    <div
      className="shadow-lg fixed bottom-0 left-0 z-40 w-full rounded-t-2xl bg-white"
      style={{
        height: heightValue,
        transition: isDragging ? "none" : "height 0.2s ease",
      }}
    >
      <div
        className="flex w-full cursor-ns-resize justify-center py-2"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="h-1 w-[47px] rounded-full bg-gray-300" />
      </div>
      <div className="size-full overflow-y-auto">{children}</div>
    </div>
  );
}
