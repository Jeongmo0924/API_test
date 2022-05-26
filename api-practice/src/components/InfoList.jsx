import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { petApiList } from "../slices/PetApiSlice";

import InfoItem from "./InfoItem";

const ListContainer = styled.div`
  width: 100%;
  h1 {
    text-align: center;
  }
  .items {
    display: flex;
    flex-direction: column;
  }
`;

const InfoList = () => {
  const { resultList, totalCount, loading, error } = useSelector(
    (state) => state.pet
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(petApiList());
  }, [dispatch]);

  return (
    <ListContainer>
      <h1>{totalCount && resultList[0].partName}</h1>
      <ul className="items">
        {totalCount &&
          resultList.map((item) => (
            <InfoItem item={item} key={item.contentSeq} />
          ))}
      </ul>
    </ListContainer>
  );
};

export default InfoList;
