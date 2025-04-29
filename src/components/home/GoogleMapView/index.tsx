"use client";

import { useAddressQuery } from "@/services/map/location.query";
import { extractShortAddress } from "@/utils";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function GoogleMapView() {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const { data: currentLocation } = useAddressQuery(
    location?.lat,
    location.lng
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {},
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  return (
    <>
      <p className="absolute z-50 text-t3 text-black">
        {extractShortAddress(currentLocation)}
      </p>

      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          className="h-screen w-screen"
          defaultCenter={location}
          defaultZoom={19}
          disableDefaultUI
        />
      </APIProvider>
    </>
  );
}
