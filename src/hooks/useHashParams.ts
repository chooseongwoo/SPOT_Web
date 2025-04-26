"use client";

import { useEffect, useState } from "react";

const useHashParams = () => {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.substring(1)
        : window.location.hash;
      const hashParams = new URLSearchParams(hash);
      setParams(hashParams);
    }
  }, []);

  return params;
};

export default useHashParams;
