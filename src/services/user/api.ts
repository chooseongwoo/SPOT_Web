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

export const initUser = async (): Promise<{
  profileComplete: boolean;
}> => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const kakaoProfileImage =
    session?.user.user_metadata?.picture ??
    `${window.location.origin}/images/DefaultProfileImage.png`;

  if (sessionError || !session?.user?.id) {
    throw new Error("세션이 존재하지 않거나 가져오기에 실패했습니다.");
  }

  const userId = session.user.id;

  const { data: existingUser, error: selectError } = await supabase
    .from("users")
    .select("profile_complete")
    .eq("id", userId)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    throw new Error(`유저 조회 실패: ${selectError.message}`);
  }

  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert({
      id: userId,
      nickname: `user-${userId.slice(0, 8)}`,
      profile_image_url: kakaoProfileImage,
      profile_complete: false,
    });

    if (insertError) {
      throw new Error(`유저 생성 실패: ${insertError.message}`);
    }

    return { profileComplete: false };
  }

  return { profileComplete: existingUser.profile_complete };
};
