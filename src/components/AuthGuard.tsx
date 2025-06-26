"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Storage } from "@/storage";
import TOKEN from "@/constants/token";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const openPaths = ["/auth/login", "/auth/callback"];
    if (openPaths.some((p) => pathname.startsWith(p))) {
      setChecked(true);
      return;
    }

    const token = Storage.getItem(TOKEN.ACCESS);
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    fetch("/api/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("unauthorized");
        setChecked(true);
      })
      .catch(() => {
        Storage.clear();
        router.replace("/auth/login");
      });
  }, [pathname, router]);

  if (!checked) return null;
  return <>{children}</>;
}
