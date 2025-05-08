"use client";

import { BottomSheet } from "@/components/home";
import { GPSIcon } from "@/components/icons";
import AlarmIcon from "@/components/icons/AlarmIcon";
import { useAddressQuery } from "@/services/map/location.query";
import { Position } from "@/types";
import { extractShortAddress } from "@/utils";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const GoogleMapView = dynamic(() => import("@/components/home/GoogleMapView"), {
  ssr: false,
});

export default function Home() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [position, setPosition] = useState<Position>({
    lat: 0,
    lng: 0,
  });

  const { data: currentLocation } = useAddressQuery(position.lat, position.lng);

  const handleGetUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.setCenter(position);
      mapRef.current.setZoom(19);
    }
  };

  return (
    <div className="size-full flex-1">
      <div className="absolute left-1/2 top-[55px] z-50 flex w-[85%] -translate-x-1/2 items-center justify-between">
        <p className="text-t3 text-black">
          {extractShortAddress(currentLocation)}
        </p>
        <div className="rounded-xl bg-white p-[10px] shadow-custom-gray">
          <AlarmIcon isRead />
        </div>
      </div>
      <div
        onClick={handleGetUserLocation}
        className="absolute bottom-[167px] left-6 z-50 rounded-[100%] bg-white p-[10px] shadow-custom-gray"
      >
        <GPSIcon />
      </div>
      <GoogleMapView
        mapRef={mapRef}
        position={position}
        setPosition={setPosition}
      />
      <BottomSheet maxHeight={520} height={180} minHeight={180}>
        ㅏㅏ
      </BottomSheet>
    </div>
  );
}
