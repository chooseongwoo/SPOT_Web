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

export const initUser = async (): Promise<{ profileComplete: boolean }> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  const profileImageUrl =
    session?.user.user_metadata?.picture ||
    process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_URL;

  if (!userId) {
    throw new Error("세션 없음");
  }

  const { data: existingUser, error: selectError } = await supabase
    .from("users")
    .select("profile_complete")
    .eq("id", userId)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    throw new Error(`유저 조회 실패: ${selectError.message}`);
  }

  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId,
        nickname: `user-${userId.slice(0, 8)}`,
        profile_image_url: profileImageUrl,
        profile_complete: false,
      },
    ]);

    if (insertError) {
      throw new Error(`유저 생성 실패: ${insertError.message}`);
    }

    return { profileComplete: false };
  }

  return { profileComplete: existingUser.profile_complete };
};

export const updateUser = async ({
  nickname,
  profile_image_url,
}: {
  nickname: string;
  profile_image_url: string;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  return supabase
    .from("users")
    .update({
      nickname,
      profile_image_url,
      profile_complete: true,
    })
    .eq("id", userId);
};
