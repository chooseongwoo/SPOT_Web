import { supabase } from "@/lib/supabaseClient";

export const signInWithKakao = async () => {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return data;
};
