"use client";

import {
  Circle,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import { useAddressQuery } from "@/services/map/location.query";
import { extractShortAddress } from "@/utils";
import AlarmIcon from "@/components/icons/AlarmIcon";
import { circleOptions, mapOptions } from "@/constants";
import { useWatchPosition } from "@/hooks";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapView() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [heading, setHeading] = useState<number>(0);

  const { data: currentLocation } = useAddressQuery(position.lat, position.lng);

  useWatchPosition({ setPosition, setHeading });

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-b2 text-black">지도 불러오는 중...</p>
      </div>
    );
  }

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

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={19}
        options={mapOptions}
      >
        <Marker
          position={position}
          icon={{
            url: "/images/UserLocationMarker.svg",
            rotation: heading,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
        <Circle center={position} options={circleOptions} />
      </GoogleMap>
    </>
  );
}
