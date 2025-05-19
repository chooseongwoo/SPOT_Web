"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ name }: { name: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="w-[86px] rounded-xl border border-gray-2 bg-white p-[10px] text-btn1 text-black"
    >
      {name}
    </button>
  );
}
