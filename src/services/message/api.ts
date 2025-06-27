import { supabase } from "@/lib/supabaseClient";
import MessageType from "@/types/message.type";
import { formatDateKSTForDB } from "@/utils";

const RANGE = 0.00045; // roughly 50 meters

export const getNearbyMessages = async (
  lat: number,
  lng: number
): Promise<MessageType[]> => {
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
    ...(m as Omit<MessageType, "nickname" | "read">),
    nickname: m.users.nickname,
    read: readIds.includes(m.id),
  }));
};

export const getMessage = async (id: string): Promise<MessageType> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const { data, error } = await supabase
    .from("messages")
    .select("*, users(nickname)")
    .eq("id", id)
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
    ...(data as Omit<MessageType, "nickname" | "read">),
    nickname: (data as any).users.nickname,
    read: !!view,
  } as MessageType;
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
        created_at: formatDateKSTForDB(new Date()),
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as MessageType;
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

  const openAt = formatDateKSTForDB(new Date(open_at));

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
        created_at: formatDateKSTForDB(new Date()),
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as MessageType;
};

export const readMessage = async (id: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  await supabase
    .from("message_views")
    .insert([{ user_id: userId, message_id: id }]);
};

export const getMyMessages = async (): Promise<MessageType[]> => {
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
    ...(m as Omit<MessageType, "nickname" | "read">),
    nickname: m.users.nickname,
    read: true,
  }));
};

export const getFoundMessages = async (): Promise<MessageType[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) throw new Error("세션 없음");

  const { data, error } = await supabase
    .from("message_views")
    .select("message:messages(*, users(nickname))")
    .eq("user_id", userId)
    .order("viewed_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []).map((v: any) => ({
    ...(v.message as Omit<MessageType, "nickname" | "read">),
    nickname: v.message.users.nickname,
    read: true,
  }));
};
