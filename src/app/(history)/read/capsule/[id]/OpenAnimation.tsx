import { Capsule3DIcon } from "@/components/icons";

export default function OpenAnimation() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-44 pt-36">
      <p className="text-t2 text-white">타임캡슐이 열리고 있습니다...</p>
      <Capsule3DIcon width={120} height={150} />
    </div>
  );
}
