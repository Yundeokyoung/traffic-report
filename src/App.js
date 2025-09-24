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
        center: new kakao.maps.LatLng(35.74855, 129.538207), 
        level: 12
      };
      mapRef.current = new kakao.maps.Map(container, options);

      mapRef.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    });
  }, []);

  const flight_Btn = () => {
    window.location.href = "http://localhost:3001/";
  }

  return (
    <div>
      <div
        id="map"
        style={{ width: "100%", height: "100%", border: "1px solid black" }}
      ></div>
        <button onClick={flight_Btn}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          padding: "10px 20px",
        }}>항공</button>
    </div>
  );
};

export default Traffic_report;