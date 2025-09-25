/* global kakao */
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TrafficReport = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.kakao) {
      console.error("카카오 지도 SDK가 로드되지 않았습니다.");
      return;
    }

    kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(35.74855, 129.538207),
        level: 12,
      };
      mapRef.current = new kakao.maps.Map(container, options);
      mapRef.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    });
  }, []);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div
        id="map"
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
      ></div>

      <button
        onClick={() => navigate("/App2")}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 9999, 
          padding: "10px 20px",
          backgroundColor: "white",
          border: "1px solid #333",
          cursor: "pointer"
        }}
      >
        항공 지도
      </button>
    </div>
  );
};

export default TrafficReport;
