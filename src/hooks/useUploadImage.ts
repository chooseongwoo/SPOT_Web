"use client";

import { useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const useUploadImage = () => {
  const uploadImage = useCallback(async (onSelect: (_: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const safeFileName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9.\-_]/g, "");

      const fileName = `${uuidv4()}-${safeFileName}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`profiles/${fileName}`, file);

      if (error) {
        alert("이미지 업로드 실패:");
        return;
      }

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path);

      const publicUrl = publicData.publicUrl;
      onSelect(publicUrl);
    };

    input.click();
  }, []);

  return uploadImage;
};

export default useUploadImage;
