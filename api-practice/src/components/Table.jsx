import { memo } from "react";
import styled from "styled-components";

/** 표에 CSS를 적용한 styledComponents */
const Table = memo(styled.table`
  border-collapse: collapse;
  border-bottom: 3px solid #16b;
  font-size: 14px;
  text-align: center;
  margin: auto;
  width: 100%;

  th {
    color: #16b;
    background: #f0f6f9;
    padding: 10px;
    border: 1px solid #ddd;

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
