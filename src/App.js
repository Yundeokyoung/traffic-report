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

      // 교통정보 레이어 추가
      mapRef.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute", 
          top: 0,
          left: 0,
        }}
      ></div>

      <button
        onClick={() => navigate("/flight")}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 99999, 
          padding: "10px 20px",
          backgroundColor: "white",
          border: "1px solid #333",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        항공
      </button>
    </div>
  );
};

export default TrafficReport;
