import { supabase } from "@/lib/supabaseClient";

export const getNotices = async () => {
  const { data, error } = await supabase
    .from("notices")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};
