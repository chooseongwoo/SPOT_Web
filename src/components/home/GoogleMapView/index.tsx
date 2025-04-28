"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

export default function GoogleMapView() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map style={containerStyle} defaultCenter={center} defaultZoom={12} />
    </APIProvider>
  );
}
