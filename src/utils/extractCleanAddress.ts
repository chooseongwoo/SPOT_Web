import { AddressComponent } from "@/types/googleGeocode.type";

const extractCleanAddress = (components?: AddressComponent[]): string => {
  if (!components) return "";

  return components
    .filter(
      (comp) =>
        !comp.types.includes("country") && !comp.types.includes("postal_code")
    )
    .reverse()
    .map((comp) => comp.long_name)
    .join(" ");
};

export default extractCleanAddress;
