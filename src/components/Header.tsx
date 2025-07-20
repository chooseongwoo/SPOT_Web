"use client";

import { ChevronIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="relative flex h-12 w-full items-center bg-white px-6">
      <ChevronIcon onClick={() => router.back()} />
      <p className="absolute left-1/2 -translate-x-1/2 text-headline text-black">
        {title}
      </p>
    </div>
  );
}
