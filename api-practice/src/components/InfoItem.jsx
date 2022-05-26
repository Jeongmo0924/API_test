import React from "react";
import styled from "styled-components";

import MapContainer from "../components/MapContainer";
import KakaoMap from "../components/KakaoMap";

const ItemContainer = styled.li`
  margin: 8px 0;
  width: 100%;
  display: flex;
  .descriptions {
    margin-left: 12px;
    .infos {
      display: flex;
      justify-content: space-between;
      &.small {
        font-size: 12px;
      }
    }
  }
`;

const InfoItem = ({ item }) => {
  const {
    areaName,
    partName,
    latitude: lat,
    longitude: lng,
    title,
    address,
    tel,
  } = item;

  return (
    <ItemContainer>
      <a href={url}>
        <div className="descriptions">
          <div className="infos">
            <span>{areaName}</span>
            <span>{partName}</span>
          </div>
          <h3>{title}</h3>
          <div className="infos small">
            <span>{address}</span>
            <span>{tel}</span>
          </div>
        </div>
        <MapContainer size="200px">
          {/* 정적으로 바꾸기 */}
          <KakaoMap lat={lat} lng={lng} />
        </MapContainer>
      </a>
    </ItemContainer>
  );
};

export default InfoItem;
