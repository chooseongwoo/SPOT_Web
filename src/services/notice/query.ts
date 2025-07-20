import { useQuery } from "@tanstack/react-query";
import { getNotices } from "./api";
import { QUERY_KEY } from "@/constants";

export const useGetNotices = () => {
  return useQuery({
    queryKey: [QUERY_KEY.notices],
    queryFn: getNotices,
  });
};
