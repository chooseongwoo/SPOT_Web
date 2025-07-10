"use client";

import {
  BottomSheet,
  HistoryItem,
  EmptyHistory,
} from "@/app/(tabs)/components";
import { GPSIcon, PlusIcon } from "@/components/icons";
import AlarmIcon from "@/components/icons/AlarmIcon";
import { useAddressQuery } from "@/services/map/location.query";
import { Position } from "@/types";
import { extractCleanAddress } from "@/utils";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useNearbyMessagesQuery } from "@/services/message/query";
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
  const { data: messages } = useNearbyMessagesQuery(position.lat, position.lng);

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
          {extractCleanAddress(currentLocation?.address_components)}
        </p>
        <div className="rounded-xl bg-white p-[10px] shadow-custom-gray">
          <AlarmIcon isRead />
        </div>
      </div>

      <GoogleMapView
        mapRef={mapRef}
        position={position}
        setPosition={setPosition}
        messageData={messages || []}
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
            className="flex items-center justify-center"
            onClick={() => router.push("/write")}
          >
            <PlusIcon />
          </div>
        </div>
        {messages && messages.length > 0 ? (
          <div className="flex w-full flex-col divide-y divide-gray-1 pb-28 pt-3">
            {messages.map((message) => (
              <div key={message.id} className="py-[10px]">
                <HistoryItem
                  history={message}
                  onClick={() => {
                    if (
                      message.is_time_capsule &&
                      message.open_at &&
                      new Date(message.open_at).getTime() > Date.now()
                    ) {
                      return;
                    }
                    if (mapRef.current) {
                      mapRef.current.panTo({
                        lat: message.lat,
                        lng: message.lng,
                      });
                      mapRef.current.setZoom(19);
                    }
                    router.push(
                      `/read/${
                        message.is_time_capsule ? "capsule" : "message"
                      }/${message.id}`
                    );
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-[120px]">
            <EmptyHistory
              message="주변에 남겨진 기록이 없어요..."
              subTitle="내가 제일 먼저 기록을 남겨볼까요?"
              buttonText="기록 남기러 가기"
              onClick={() => router.push("/write")}
            />
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
