"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Storage } from "@/storage";
import TOKEN from "@/constants/token";
import { supabase } from "@/lib/supabaseClient";

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

    const accessToken = Storage.getItem(TOKEN.ACCESS);
    const refreshToken = Storage.getItem(TOKEN.REFRESH);
    if (!accessToken || !refreshToken) {
      Storage.clear();
      router.replace("/auth/login");
      return;
    }

    const validate = async (token: string) => {
      const res = await fetch("/api/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.ok;
    };

    const run = async () => {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });

      if (await validate(accessToken)) {
        setChecked(true);
        return;
      }

      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!res.ok) {
        Storage.clear();
        router.replace("/auth/login");
        return;
      }
      const data = await res.json();
      Storage.setItem(TOKEN.ACCESS, data.access_token);
      Storage.setItem(TOKEN.REFRESH, data.refresh_token);
      supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token });

      if (await validate(data.access_token)) {
        setChecked(true);
      } else {
        Storage.clear();
        router.replace("/auth/login");
      }
    };

    run();
  }, [pathname, router]);

  if (!checked) return null;
  return <>{children}</>;
}
