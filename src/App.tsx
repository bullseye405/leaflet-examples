import { LatLngExpression, icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import "./App.css";
import { Place, places } from "./places";
import "leaflet/dist/leaflet.css";

import marker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";

let markerIcon = icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
});

const AddMarker = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useMapEvents({
    click: (e) => {
      setPosition(e.latlng); // 👈 add marker

      /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
    },
  });

  return position === null ? null : <Marker position={position} icon={markerIcon}></Marker>;
};

const App = () => {
  const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position

  const showPreview = (place: Place) => {
    console.log({ place });
  };

  return (
    <div className="map__container">
      <MapContainer center={defaultPosition} zoom={13}>
        <AddMarker />
        {/* {places.map((place) => (
          <Marker
            key={place.id}
            position={place.position} // 👈
            eventHandlers={{ click: () => showPreview(place) }}
            icon={loveIcon}
          >
            <Tooltip>{place.title}</Tooltip>
          </Marker>
        ))} */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default App;
