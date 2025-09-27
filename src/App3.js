import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const shipIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const ShipTracker = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/vega/vega-datasets/master/data/airports.json"
        );
        const data = await response.json();

        const sampleShips = data.slice(0, 20).map((item, index) => ({
          id: index,
          name: item.name,
          lat: item.latitude,
          lon: item.longitude,
          speed: Math.floor(Math.random() * 20) + 5,
          destination: "Unknown",
        }));

        setShips(sampleShips);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchShips();
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {ships.map((ship) => (
        <Marker
          key={ship.id}
          position={[ship.lat, ship.lon]}
          icon={shipIcon}
        >
          <Popup>
            <b>{ship.name}</b>
            <br />
            속도: {ship.speed} knots
            <br />
            목적지: {ship.destination}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ShipTracker;
