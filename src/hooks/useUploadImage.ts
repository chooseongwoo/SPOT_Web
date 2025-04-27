"use client";

import { useCallback, useState } from "react";

const useUploadImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
      }
    };

    input.click();
  }, []);

  return { imageUrl, uploadImage };
};

export default useUploadImage;
