import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { petApiList } from "../slices/PetApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Table from "../components/Table";
import PageWrapper from "../components/PageWrapper";
import ErrorView from "../components/ErrorView";
import Spinner from "../components/Spinner";

/** 드롭다운을 배치하기 위한 박스 */
const SelectContainer = memo(styled.div`
  position: sticky;
  top: 105.5px;
  /* top: 102.5px+3px; */
  margin: 0;
  padding: 12px 0;
  text-align: right;
  background-color: #fff;
  border-bottom: 3px solid #16b;
  z-index: 999;

  select {
    margin: 0 15px;
    font-size: 16px;
    padding: 5px 10px;
  }
`);

const TableWrapper = memo(styled.div`
  thead {
    position: sticky;
    top: 164.5px;
  }
  tbody {
    tr {
      .smallText {
        font-size: 12px;
      }
      &:hover {
        color: var(--color-blue);
        cursor: pointer;
        .title {
          font-weight: bold;
        }
      }
    }
  }
`);

const ButtonContainer = memo(styled.div`
  margin: 24px 0;
  text-align: center;
  button {
    cursor: pointer;
    padding: 4px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  p {
    display: inline-block;
    padding: 0 20px;
  }
  span {
    color: #16b;
  }
`);

const partNames = ["식음료", "숙박", "관광지", "체험", "동물병원"];

const PetApi = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resultList, totalCount, loading, error } = useSelector(
    (state) => state.pet
  );

  // 드롭박스의 선택값이 저장될 상태값
  const [partCode, setPartCode] = React.useState("");
  // 몇 페이지를 나타낼 것인지를 의미하는 상태값
  const [page, setPage] = React.useState(1);
  // 한 페이지당 보여줄 결과 수를 저장할 상태값
  const [pageBlock, setPageBlock] = React.useState(20);

  React.useEffect(() => {
    dispatch(
      petApiList({
        partCode: partCode,
        page: page === 1 ? page : (page - 1) * pageBlock,
        pageBlock: pageBlock,
      })
    );
  }, [dispatch, partCode, page, pageBlock]);

  // 드롭박스의 선택값이 바뀔 때, 그 값을 상태값에 저장할 함수
  const onChangePart = useCallback((e) => {
    e.preventDefault();
    setPartCode(e.target.value);
    setPage(1);
  }, []);

  // 페이지 선택 버튼이 눌렸을 때 페이지를 바꿀 함수
  const onClickNext = useCallback(
    (e) => {
      e.preventDefault();
      setPage((page) => {
        if (page >= totalCount / pageBlock) return page;
        return page + 1;
      });
    },
    [totalCount, pageBlock]
  );

  const onClickBefore = useCallback((e) => {
    e.preventDefault();
    setPage((page) => {
      if (page <= 1) return 1;
      return page - 1;
    });
  }, []);

  // 페이지당 결과수 드롭박스 상태값에 저장할 함수
  const onChangePageBlock = useCallback((e) => {
    e.preventDefault();

    setPageBlock(e.target.value);
    setPage(1);
  }, []);

  const onItemClick = useCallback(
    (e) => {
      const { contentseq, partname } = e.currentTarget.dataset;
      const partcode = `PC0${partNames.indexOf(partname) + 1}`;
      navigate(`/detail/${partcode}/${contentseq}`);
    },
    [navigate]
  );

  return (
    <PageWrapper>
      {/* 분야별 선택 필터 */}
      <Spinner visible={loading} />
      <SelectContainer>
        <label>
          분야 선택 :
          <select
            className="select"
            name="part"
            onChange={onChangePart}
            defaultValue={partCode}
          >
            <option name="part" value="">
              -- 분야 --
            </option>
            {partNames.map((name, index) => (
              <option name="part" value={`PC0${index + 1}`} key={index}>
                {name}
              </option>
            ))}
          </select>
        </label>
        페이지 당 결과수 :{/* 페이지당 결과 수 선택 드롭다운 */}
        <label>
          <select
            className="select"
            name="pageBlock"
            onChange={onChangePageBlock}
            defaultValue={pageBlock}
          >
            {[10, 20, 30, 40, 50].map((num) => (
              <option name="pageBlock" value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </SelectContainer>
      {error ? (
        <ErrorView error={error} />
      ) : (
        <TableWrapper>
          <Table>
            <thead className="thead">
              <tr>
                <th width="52px">분야명</th>
                <th width="52px">지역명</th>
                <th width="228px">업체명</th>
                <th>주소</th>
                <th width="120px">전화번호</th>
              </tr>
            </thead>
            <tbody>
              {resultList &&
                resultList.map((v) => {
                  return (
                    <tr
                      key={v.contentSeq}
                      onClick={onItemClick}
                      data-contentseq={v.contentSeq}
                      data-partname={v.partName}
                    >
                      <td>{v.partName}</td>
                      <td>{v.areaName}</td>
                      <td className="title">{v.title}</td>
                      <td className="smallText">{v.address}</td>
                      <td className="smallText">{v.tel}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {/* 페이지 선택 버튼 */}
          <ButtonContainer>
            <button type="button" onClick={onClickBefore}>
              이전 페이지
            </button>
            <p>
              {page} / <span>{Math.ceil(totalCount / pageBlock)}</span>
            </p>
            <button type="button" onClick={onClickNext}>
              다음 페이지
            </button>
          </ButtonContainer>
        </TableWrapper>
      )}
    </PageWrapper>
  );
});

export default PetApi;
