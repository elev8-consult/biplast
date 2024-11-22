import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Maps = () => {
  const center = [51.505, -0.09];

  return (
    <section className="w-full mt-10">
      {" "}
      <div className="w-full flex items-center justify-center py-12">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className="rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default Maps;
