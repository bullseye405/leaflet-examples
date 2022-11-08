import { Key, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useSWR from "swr";
import "./App.css";
import { parkData } from "./constant";

interface Park {
  type: string;
  properties: {
    PARK_ID: number;
    NAME: string;
    DESCRIPTION: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

interface Crime {
  id: Key | null | undefined;
  location: { latitude: number; longitude: number };
}

const lat = 52.629729;
const lng = -1.131592;

const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2020-10`;

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

const App = () => {
  const [activePark, setActivePark] = useState<Park | null>(null);
  const { data, error } = useSWR(url, fetcher);
  const crimes = useMemo(() => {
    return data && !error ? data.slice(0, 100) : [];
  }, [data, error]);

  return (
    <MapContainer center={[lat, lng]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {crimes.map((crime: Crime) => (
        <Marker key={crime.id} position={[crime.location.latitude, crime.location.longitude]} />
      ))}

      {activePark && (
        <Popup position={[activePark.geometry.coordinates[1], activePark.geometry.coordinates[0]]}>
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTION}</p>
          </div>
        </Popup>
      )}

      {parkData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[park.geometry.coordinates[1], park.geometry.coordinates[0]]}
          eventHandlers={{
            click: () => {
              setActivePark(park);
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default App;
