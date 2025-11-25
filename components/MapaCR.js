import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

export default function MapaCR({ onSelect }) {
  const [posicion, setPosicion] = useState(null);

  function ManejadorClick() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosicion([lat, lng]);
        onSelect(lat, lng);
      },
    });
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,     
        height: 350,     
        borderRadius: 12,  
        overflow: "hidden", 
        marginTop: 16,
      }}
    >
      <MapContainer
        center={[9.7489, -83.7534]} // fija Costa Rica
        zoom={8}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <ManejadorClick />

        {posicion && <Marker position={posicion} />}
      </MapContainer>
    </div>
  );
}
