import { Capsule3DIcon } from "@/components/icons";
import { useEffect, useState } from "react";

export default function OpenAnimation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlow, setIsGlow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setIsGlow(true);
      }, 700);
    }, 100);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-44 pt-36">
      <p className="text-t2 text-white">타임캡슐이 열리고 있습니다...</p>
      <Capsule3DIcon width={120} height={150} isOpen={isOpen} isGlow={isGlow} />
    </div>
  );
}
