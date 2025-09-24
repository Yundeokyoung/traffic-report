/* global kakao */
import React, { useEffect, useRef } from "react";

const Traffic_report = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao) {
      console.error("카카오 지도 SDK가 로드되지 않았습니다.");
      return;
    }

    kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(36.74855, 129.538207), 
        level: 12
      };
      mapRef.current = new kakao.maps.Map(container, options);
    });
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%", border: "1px solid black" }}
    ></div>
  );
};

export default Traffic_report;