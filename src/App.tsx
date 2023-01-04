import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import world from "./geojson/world.json";

import { useRef } from "react";
import { statesData } from "./states";
import { highlightFeature, style } from "./utils";
// import { useState } from "react";

// let markerIcon = icon({
//   iconUrl: marker,
//   iconRetinaUrl: marker,
// });

const App = () => {
  const defaultPosition: LatLngExpression = [37.8, -96];
  const zoom = 4;

  const geojson = useRef<any>();
  const mapRef = useRef<any>();

  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={zoom}
        ref={mapRef}
        style={{ backgroundColor: "#c5e8ff" }}
      >
        <GeoJSON
          ref={geojson}
          data={world as any}
          style={style as any}
          onEachFeature={(feature, layer: any) => {
            layer.on({
              mouseover: highlightFeature,
              mouseout: (e: any) => {
                geojson.current.resetStyle(e.target);
              },
              click: (e: any) => {
                mapRef.current.fitBounds(e.target.getBounds());
              },
            });
          }}
        />

        {/* <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
      </MapContainer>
    </div>
  );
};

export default App;
