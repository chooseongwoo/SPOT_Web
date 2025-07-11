import { useQuery } from "@tanstack/react-query";

import QUERY_KEY from "@/constants/queryKey";
import { getUser } from "./api";

export const useUserInfoQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY.user.INFO],
    queryFn: () => getUser(),
  });
