"use client";

import AlarmIcon from "@/components/icons/AlarmIcon";
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
      <div className="absolute left-1/2 top-[55px] z-50 flex w-[85%] -translate-x-1/2 items-center justify-between">
        <p className="text-t3 text-black">
          {extractShortAddress(currentLocation)}
        </p>
        <div className="rounded-xl bg-white p-[10px] shadow-custom-gray">
          <AlarmIcon />
        </div>
      </div>

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
