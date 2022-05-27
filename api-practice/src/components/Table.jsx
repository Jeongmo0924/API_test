import { memo } from "react";
import styled from "styled-components";

/** 표에 CSS를 적용한 styledComponents */
const Table = memo(styled.table`
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
  text-align: center;
  border-collapse: collapse;
  border-bottom: 3px solid #16b;

  th {
    padding: 10px;
    border: 1px solid #ddd;
    color: #16b;
    background-color: #f0f6f9;

    &:first-child {
      border-left: 0;
    }

    &:last-child {
      border-right: 0;
    }
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    &:first-child {
      border-left: 0;
    }
    &:last-child {
      border-right: 0;
    }
  }
`);

export default Table;
