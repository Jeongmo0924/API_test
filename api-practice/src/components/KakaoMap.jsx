import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ width, height = width, lat, lng }) => {
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: lat ?? 37.3353078277842, // 받아온 후 지우기
        lng: lng ?? 128.283206354633, // 받아온 후 지우기
      }}
      style={{
        // 지도의 크기
        width: width ?? "500px",
        height: height ?? "500px",
      }}
      level={3} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: lat ?? 37.3353078277842, // 받아온 후 지우기
          lng: lng ?? 128.283206354633, // 받아온 후 지우기
        }}
      />
    </Map>
  );
};

export default KakaoMap;
