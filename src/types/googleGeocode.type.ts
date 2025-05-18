import { Position } from "@/types/position.type";

export interface GoogleGeocodeResponse {
  results: GoogleGeocodeResult[];
  status: string;
  plus_code?: unknown;
}

export interface GoogleGeocodeResult {
  formatted_address: string;
  address_components: AddressComponent[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: Position;
      southwest: Position;
    };
  };
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
