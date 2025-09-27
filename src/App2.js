import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function App2() {
  const [planes, setPlanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch("https://opensky-network.org/api/states/all");
        const data = await response.json();
        if (data.states) {
          const planeData = data.states.slice(0, 20).map((p) => ({
            icao24: p[0],
            callsign: p[1],
            country: p[2],
            lat: p[6],
            lon: p[5],
            velocity: p[9],
            heading: p[10],
            altitude: p[13],
          }));
          setPlanes(planeData);
        }
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };

    fetchPlanes();
    const interval = setInterval(fetchPlanes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="map-container"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {planes.map(
          (plane) =>
            plane.lat &&
            plane.lon && (
              <Marker
                key={plane.icao24}
                position={[plane.lat, plane.lon]}
                rotationAngle={plane.heading}
                rotationOrigin="center"
              >
                <Popup>
                  ✈️ {plane.callsign || "N/A"} <br />
                  국가: {plane.country} <br />
                  고도: {plane.altitude} m <br />
                  속도: {plane.velocity} m/s
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>

      {/* 도로 상황 페이지 버튼 */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          padding: "10px 20px",
        }}
      >
        도로 상황
      </button>
    </div>
  );
}

export default App2;
