import React, { memo } from "react";
import styled from "styled-components"
import { petApiList } from "../slices/PetApiSlice";
import { useSelector, useDispatch } from "react-redux";
import Table from "../components/Table"
import { NavLink } from "react-router-dom";
/** 드롭다운을 배치하기 위한 박스 */
const SelectContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    border-bottom: 3px solid #16B;
    padding: 10px 0;
    margin: 0;
    text-align: right;

    hr {
        border: none;
        border-top: 3px solid #16B;
    }

    h1 {
        text-align: center;
        color: #16B;
    }

    select {
        margin: 0 15px;
        font-size: 16px;
        padding: 5px 10px;
    }
`

const PetApi = memo(() => {
    const dispatch = useDispatch();
    const { resultList, totalCount, loading, error } = useSelector((state) => state.pet);

    // 드롭박스의 선택값이 저장될 상태값
    const [partCode, setPartCode] = React.useState("");
    // 몇 페이지를 나타낼 것인지를 의미하는 상태값
    const [page, setPage] = React.useState(1);
    // 한 페이지당 보여줄 결과 수를 저장할 상태값
    const [pageBlock, setPageBlock] = React.useState(10);

    React.useEffect(() => {
        dispatch(
            petApiList({
                partCode: partCode,
                page: page === 1 ? page : (page-1)*pageBlock,
                pageBlock: pageBlock,
            })
        );
    }, [dispatch, partCode, page, pageBlock, ]);

    // 드롭박스의 선택값이 바뀔 때, 그 값을 상태값에 저장할 함수
    const onChangePart = (e) => {
        e.preventDefault();
        setPartCode(e.target.value);
        setPage(1);
    };

    // 페이지 선택 버튼이 눌렸을 때 페이지를 바꿀 함수
    const onClickNext = (e) => {
        e.preventDefault();
        const nextPage = page + 1;
        if(nextPage < totalCount/pageBlock + 1){
        setPage(nextPage);
        }
    };
    const onClickBefore = (e) => {
        e.preventDefault();
        const beforePage = page - 1;
        if (beforePage > 0) {
            setPage(beforePage);
        }
    };

    // 페이지당 결과수 드롭박스 상태값에 저장할 함수
    const onChangePageBlock = (e) => {
        e.preventDefault();

        setPageBlock(e.target.value);
        setPage(1);
    };
    return (
        <div>
            <SelectContainer>
            <h1>강원도 반려동물 동반관광 API</h1>
            <hr />
                {/* 분야별 선택 필터 */}
                <label>분야 선택 : 
                <select className="select" name="part" onChange={onChangePart}>
                    <option name="part" value="">
                        -- 분야 --
                    </option>
                    <option name="part" value="PC01">
                        식음료
                    </option>
                    <option name="part" value="PC02">
                        숙박
                    </option>
                    <option name="part" value="PC03">
                        관광지
                    </option>
                    <option name="part" value="PC04">
                        체험
                    </option>
                    <option name="part" value="PC05">
                        동물병원
                    </option>
                </select>
                </label> 페이지 당 결과수 : 
                {/* 페이지당 결과 수 선택 드롭다운 */}
                <label>
                <select className="select" name="pageBlock" onChange={onChangePageBlock}>
                    <option name="pageBlock" value="10">
                        10
                    </option>
                    <option name="pageBlock" value="20">
                        20
                    </option>
                    <option name="pageBlock" value="30">
                        30
                    </option>
                    <option name="pageBlock" value="40">
                        40
                    </option>
                    <option name="pageBlock" value="50">
                        50
                    </option>
                </select>
                </label>
            </SelectContainer>
            <Table>
                <thead style={{position: 'sticky', top:'151.03px'}}>
                    <tr>
                        <th>지역명</th>
                        <th>분야명</th>
                        <th>업체명</th>
                        <th>주소</th>
                        <th>전화번호</th>
                        <th>상세페이지</th>
                    </tr>
                </thead>
                <tbody>
                    {resultList &&
                    resultList.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td>{v.areaName}</td>
                                <td>{v.partName}</td>
                                <td>{v.title}</td>
                                <td>{v.address}</td>
                                <td>{v.tel}</td>
                                <td><NavLink to= "/detail" state = {{ partCode: partCode || "PC02", contentNum: v.contentSeq}}>상세보기</NavLink></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {/* 페이지 선택 버튼 */}
            <div style={{textAlign: "center"}}>
                <button type="button" onClick={onClickBefore}>
                    이전 페이지
                </button>
                <p style={{ display: "inline-block", padding: "0 20px" }}>{page} / <span style={{color: '#16B'}}>{Math.ceil(totalCount/pageBlock)}</span></p>
                <button type="button" onClick={onClickNext}>
                    다음 페이지
                </button>
            </div>
        </div>
    );
});

export default PetApi;
