import React, { memo } from "react";
import { petApiList } from "../slices/PetApiSlice";
import { useSelector, useDispatch } from "react-redux";

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
                page: page,
                pageBlock: pageBlock,
            })
        );
    }, [dispatch, partCode, page, pageBlock]);

    // 드롭박스의 선택값이 바뀔 때, 그 값을 상태값에 저장할 함수
    const onChangePart = (e) => {
        e.preventDefault();

        setPartCode(e.target.value);
    };

    // 페이지 선택 버튼이 눌렸을 때 페이지를 바꿀 함수
    const onClickNext = (e) => {
        e.preventDefault();
        const nextPage = page + 1;
        console.log(totalCount/pageBlock);
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
    };
    return (
        <div>
            {/* 분야별 선택 필터 */}
            <select name="part" onChange={onChangePart}>
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
            <hr />
            {/* 페이지 선택 버튼 */}
            <button type="button" onClick={onClickBefore}>
                이전 페이지
            </button>
            <p style={{ display: "inline-block", padding: "0 20px" }}>{page}</p>
            <button type="button" onClick={onClickNext}>
                다음 페이지
            </button>
            <hr />
            {/* 페이지당 결과 수 선택 드롭다운 */}
            <select name="pageBlock" onChange={onChangePageBlock}>
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
            <hr />

            {JSON.stringify(resultList)}
            {resultList &&
                resultList.map((v, i) => {
                    return <h1 key={i}>{v.title}</h1>;
                })}
        </div>
    );
});

export default PetApi;
