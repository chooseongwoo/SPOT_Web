import { QUERY_KEY } from "@/constants";
import { getAddressFromCoords } from "@/services/map/api";
import { GoogleGeocodeResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAddressQuery = (lat: number, lng: number) => {
  return useQuery<GoogleGeocodeResult>({
    queryKey: [QUERY_KEY.location.ADDRESS, lat, lng],
    queryFn: () => getAddressFromCoords(lat, lng),
    enabled: !!lat && !!lng,
    refetchOnWindowFocus: true,
  });
};
