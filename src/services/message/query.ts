import { useQuery } from "@tanstack/react-query";
import {
  getNearbyMessages,
  getMessage,
  getMyMessages,
  getFoundMessages,
} from "./api";
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

export const useMyMessagesQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY.message.MINE],
    queryFn: getMyMessages,
  });

export const useFoundMessagesQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY.message.FOUND],
    queryFn: getFoundMessages,
  });
