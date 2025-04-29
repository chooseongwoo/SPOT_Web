import { GoogleGeocodeResponse } from "@/types";
import axios from "axios";

export const getAddressFromCoords = async (lat: number, lng: number) => {
  const { data } = await axios.get<GoogleGeocodeResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  return data.results[0];
};
