import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  margin: 32px 0;
  h3 {
    margin: 16px 0;
    border-bottom: 3px solid var(--color-blue);
    &:hover {
      color: var(--color-blue);
    }
  }
  ul {
    list-style: inside;
  }
`;

const DetailItem = ({ title, data }) => {
  return (
    data && (
      <ItemWrapper>
        <h3>{title}</h3>
        <ul>
          {data
            .substring(1)
            .split("- ")
            .map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
        </ul>
      </ItemWrapper>
    )
  );
};

export default DetailItem;
