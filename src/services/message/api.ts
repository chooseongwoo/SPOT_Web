import { supabase } from "@/lib/supabaseClient";
import MessageType from "@/types/message.type";

const RANGE = 0.00045; // roughly 50 meters

export const getNearbyMessages = async (
  lat: number,
  lng: number
): Promise<MessageType[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .gte("lat", lat - RANGE)
    .lte("lat", lat + RANGE)
    .gte("lng", lng - RANGE)
    .lte("lng", lng + RANGE)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as MessageType[];
};

export const getMessage = async (id: string): Promise<MessageType> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data as MessageType;
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
      { user_id: userId, content, lat, lng, is_anonymous },
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
        open_at,
      },
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as MessageType;
};
