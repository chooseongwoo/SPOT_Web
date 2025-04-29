"use client";

import dynamic from "next/dynamic";

const GoogleMapView = dynamic(() => import("@/components/home/GoogleMapView"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="size-full flex-1">
      <GoogleMapView />
    </div>
  );
}
