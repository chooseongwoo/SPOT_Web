"use client";

import { useCallback } from "react";

const useUploadImage = () => {
  const uploadImage = useCallback((onSelect: (_: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onSelect(url);
      }
    };

    input.click();
  }, []);

  return uploadImage;
};

export default useUploadImage;
