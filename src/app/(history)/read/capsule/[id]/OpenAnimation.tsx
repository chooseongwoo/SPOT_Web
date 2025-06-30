import CapsuleResult from "@/app/(history)/read/capsule/[id]/CapsuleResult";
import { Capsule3DIcon } from "@/components/icons";
import React, { useEffect, useState } from "react";
import HistoryType from "@/types/history.type";

interface OpenAnimationProps {
  isMounted: boolean;
  setIsMounted: React.Dispatch<React.SetStateAction<boolean>>;
  message: HistoryType;
}

export default function OpenAnimation({
  isMounted,
  setIsMounted,
  message,
}: OpenAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlow, setIsGlow] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 100);

    const glowTimer = setTimeout(() => {
      setIsGlow(true);
    }, 800);

    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 2400);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(glowTimer);
      clearTimeout(mountTimer);
    };
  }, [setIsMounted]);

  if (isMounted) {
    return <CapsuleResult message={message} />;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-44 pt-36">
      <p className="text-t2 text-white">타임캡슐이 열리고 있습니다...</p>
      <Capsule3DIcon width={120} height={150} isOpen={isOpen} isGlow={isGlow} />
    </div>
  );
}
