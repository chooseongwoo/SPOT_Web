import { supabase } from "@/lib/supabaseClient";
import HistoryType from "@/types/history.type";

const RANGE = 0.00045;

export const getNearbyMessages = async (
  lat: number,
  lng: number
): Promise<HistoryType[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const { data, error } = await supabase
    .from("messages")
    .select("*, users(nickname)")
    .gte("lat", lat - RANGE)
    .lte("lat", lat + RANGE)
    .gte("lng", lng - RANGE)
    .lte("lng", lng + RANGE)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const ids = data?.map((d) => d.id) || [];
  const { data: views } = userId
    ? await supabase
        .from("message_views")
        .select("message_id")
        .eq("user_id", userId)
        .in("message_id", ids)
    : { data: [] };
  const readIds = views?.map((v) => v.message_id) ?? [];
  return (data || []).map((m: any) => ({
    ...(m as Omit<HistoryType, "nickname" | "read">),
    nickname: m.users.nickname,
    read: readIds.includes(m.id),
  }));
};

export const getMessage = async (id: string): Promise<HistoryType> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const { data, error } = await supabase
    .from("messages")
    .select(
      "*, users(nickname, profile_image_url), reactions(user_id), comments(*, users(nickname, profile_image_url))"
    )
    .eq("id", id)
    .order("created_at", { foreignTable: "comments", ascending: true })
    .single();

  if (error) throw new Error(error.message);

  const { data: view } = userId
    ? await supabase
        .from("message_views")
        .select("id")
        .eq("user_id", userId)
        .eq("message_id", id)
        .maybeSingle()
    : { data: null };

  return {
    ...(data as any),
    read: !!view,
  } as HistoryType;
};

export const createMessage = async ({
  content,
  lat,
  lng,
  is_anonymous,
}: {
  content: string;
  lat: number;
  lng: number;
  is_anonymous: boolean;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        user_id: userId,
        content,
        lat,
        lng,
        is_anonymous,
        created_at: new Date(),
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as HistoryType;
};

export const createCapsule = async ({
  content,
  lat,
  lng,
  open_at,
  is_anonymous,
}: {
  content: string;
  lat: number;
  lng: number;
  open_at: string;
  is_anonymous: boolean;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  const openAt = new Date(open_at);

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        user_id: userId,
        content,
        lat,
        lng,
        is_anonymous,
        is_time_capsule: true,
        open_at: openAt,
        created_at: new Date(),
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as HistoryType;
};

export const readMessage = async (id: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  const { data: existing } = await supabase
    .from("message_views")
    .select("id")
    .eq("user_id", userId)
    .eq("message_id", id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("message_views").insert([
      {
        user_id: userId,
        message_id: id,
        viewed_at: new Date(),
      },
    ]);
  }
};

export const getMyMessages = async (): Promise<HistoryType[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  const { data, error } = await supabase
    .from("messages")
    .select("*, users(nickname)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []).map((m: any) => ({
    ...(m as Omit<HistoryType, "nickname" | "read">),
    nickname: m.users.nickname,
    read: true,
  }));
};

export const getFoundMessages = async (): Promise<HistoryType[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  const { data, error } = await supabase.rpc("get_unique_message_views", {
    p_user_id: userId,
  });

  if (error) throw new Error(error.message);
  return (data || []).map((v: any) => ({
    ...(v.message as Omit<HistoryType, "nickname" | "read">),
    nickname: v.message.users.nickname,
    read: true,
  }));
};

export const addReaction = async (message_id: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user.id;
  if (!user_id) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("reactions")
    .insert([{ user_id, message_id }]);

  if (error) throw new Error(error.message);
  return data;
};

export const removeReaction = async (message_id: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user.id;
  if (!user_id) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("reactions")
    .delete()
    .eq("user_id", user_id)
    .eq("message_id", message_id);

  if (error) throw new Error(error.message);
};

export const addComment = async ({
  message_id,
  content,
}: {
  message_id: string;
  content: string;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user.id;
  if (!user_id) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("comments")
    .insert([{ user_id, message_id, content }])
    .select("*, users(nickname, profile_image_url)")
    .single();

  if (error) throw new Error(error.message);
  return data;
};
