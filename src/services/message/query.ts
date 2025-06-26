import { useQuery } from "@tanstack/react-query";
import { getNearbyMessages, getMessage } from "./api";
import QUERY_KEY from "@/constants/queryKey";

export const useNearbyMessagesQuery = (lat: number, lng: number) =>
  useQuery({
    queryKey: [QUERY_KEY.message.NEARBY, lat, lng],
    queryFn: () => getNearbyMessages(lat, lng),
    enabled: !!lat && !!lng,
  });

export const useMessageQuery = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.message.DETAIL, id],
    queryFn: () => getMessage(id),
    enabled: !!id,
  });
