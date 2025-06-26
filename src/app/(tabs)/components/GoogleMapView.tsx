"use client";

import {
  Circle,
  GoogleMap,
  Marker,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { circleOptions, mapOptions } from "@/constants";
import { useWatchPosition } from "@/hooks";
import { MessageType, Position, PositionType } from "@/types";
import MessageMarker from "./MessageMarker";

interface GoogleMapViewProps extends PositionType {
  mapRef: React.RefObject<google.maps.Map | null>;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  messageData: MessageType[];
}

export default function GoogleMapView({
  mapRef,
  position = { lat: 0, lng: 0 },
  setPosition,
  messageData,
}: GoogleMapViewProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [heading, setHeading] = useState<number>(0);
  const router = useRouter();

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={19}
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {/* 사용자 위치 */}
        <Marker
          position={position}
          icon={{
            url: "/images/UserLocationMarker.svg",
            rotation: heading,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
        {messageData.map((message) => (
          <OverlayView
            key={message.id}
            position={{ lat: message.lat, lng: message.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() =>
                router.push(
                  `/read/${message.is_time_capsule ? "capsule" : "message"}/${message.id}`
                )
              }
            >
              <MessageMarker
                type={message.is_time_capsule ? "capsule" : "message"}
                read={message.read}
                open_at={message.open_at}
              />
            </div>
          </OverlayView>
        ))}

        <Circle center={position} options={circleOptions} />
      </GoogleMap>
    </>
  );
}

const containerStyle = {
  width: "100%",
  height: "100%",
};
