import { GoogleGeocodeResult } from "@/types/googleGeocode.type";

const extractShortAddress = (geocodeResult?: GoogleGeocodeResult): string => {
  const components = geocodeResult?.address_components;

  const getComponent = (types: string[]): string | undefined => {
    return components?.find((c) => types.some((type) => c.types.includes(type)))
      ?.long_name;
  };

  const city = getComponent(["administrative_area_level_1"]);
  const district = getComponent([
    "administrative_area_level_2",
    "sublocality_level_1",
    "locality",
  ]);
  const neighborhood = getComponent([
    "sublocality_level_1",
    "sublocality",
    "neighborhood",
    "political",
  ]);

  const addressParts = [city, district, neighborhood].filter(Boolean);
  const uniqueParts = [...new Set(addressParts)];

  return uniqueParts.join(" ");
};

export default extractShortAddress;
