"use client";

import {
  BottomSheet,
  MessageItem,
  EmptyHistory,
} from "@/app/(tabs)/components";
import { GPSIcon, PlusIcon } from "@/components/icons";
import AlarmIcon from "@/components/icons/AlarmIcon";
import { useAddressQuery } from "@/services/map/location.query";
import { Position } from "@/types";
import { extractShortAddress } from "@/utils";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { messageData } from "@/data/messageData";
import { useRouter } from "next/navigation";

const GoogleMapView = dynamic(
  () => import("@/app/(tabs)/components/GoogleMapView"),
  {
    ssr: false,
  }
);

export default function Home() {
  const router = useRouter();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [position, setPosition] = useState<Position>({
    lat: 0,
    lng: 0,
  });

  const [sheetHeight, setSheetHeight] = useState(150);

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

      <GoogleMapView
        mapRef={mapRef}
        position={position}
        setPosition={setPosition}
        messageData={messageData}
      />
      <div
        onClick={handleGetUserLocation}
        style={{
          transform: `translateY(-${sheetHeight + 60}px)`,
          transition: "transform 0.1s ease-out",
        }}
        className="fixed left-6 z-50 rounded-full bg-white p-[10px] shadow-custom-gray transition-all"
      >
        <GPSIcon />
      </div>

      <BottomSheet
        maxHeight={520}
        height={150}
        minHeight={150}
        onHeightChange={setSheetHeight}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-headline text-black">기록</p>
          <div
            className="flex justify-center items-center"
            onClick={() => router.push("/write")}
          >
            <PlusIcon />
          </div>
        </div>
        {messageData.length > 0 ? (
          <div className="flex w-full flex-col divide-y divide-gray-1 pb-[45px] pt-3">
            {messageData.map((message) => (
              <div key={message.id} className="py-[10px]">
                <MessageItem
                  type={message.is_time_capsule ? "capsule" : "message"}
                  read={message.read}
                  open_at={message.open_at}
                />
              </div>
            ))}
            {messageData.map((message) => (
              <div key={message.id} className="py-[10px]">
                <MessageItem
                  type={message.is_time_capsule ? "capsule" : "message"}
                  read={message.read}
                  open_at={message.open_at}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyHistory />
        )}
      </BottomSheet>
    </div>
  );
}
