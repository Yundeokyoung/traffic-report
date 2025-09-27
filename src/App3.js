// ShipMap.js
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 선박 아이콘
const shipIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const ShipMap = () => {
  const [ships, setShips] = React.useState([]);

  useEffect(() => {
    async function fetchShips() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
        );
        const data = await res.json();
        const features = data.features.slice(0, 20);

        const shipsData = features
          .filter(f => f.geometry && f.geometry.type === "Polygon")
          .map((f, i) => {
            const coords = f.geometry.coordinates[0][0];
            return {
              name: f.properties.name || `Ship ${i}`,
              lat: coords[1],
              lon: coords[0],
              speed: Math.floor(Math.random() * 20) + 5,
              destination: "Unknown",
            };
          });

        setShips(shipsData);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    }

    fetchShips();
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {ships.map((ship, idx) => (
        <Marker key={idx} position={[ship.lat, ship.lon]} icon={shipIcon}>
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

export default ShipMap;
