import React from "react";
import { petDetailList } from "./slices/PetApiDetailSlice";
import { useSelector, useDispatch } from "react-redux";

const Test = () => {
    const dispatch = useDispatch();
    const { resultList, loading, error } = useSelector((state) => state.petDetail);

    React.useEffect(() => {
        dispatch(
            petDetailList({
                partCode: "PC02",
                contentNum: 1,
            })
        );
    }, [dispatch]);
    return (
        <div>
            {resultList && (
                <>
                    <p>{resultList.areaName}</p>
                    <p>{resultList.partName}</p>
                    <p>{resultList.title}</p>
                    <p>{resultList.keyword}</p>
                    <p>{resultList.address}</p>
                    <p>{resultList.latitude}</p>
                    <p>{resultList.longitude}</p>
                    <p>{resultList.tel}</p>
                    <p>{resultList.usedTime}</p>
                    <p>{resultList.homePage}</p>
                    <p>{resultList.content}</p>
                    <p>{resultList.provisionSupply}</p>
                    <p>{resultList.petFacility}</p>
                    <p>{resultList.restaurant}</p>
                    <p>{resultList.parkingLog}</p>
                    <p>{resultList.mainFacility}</p>
                    <p>{resultList.usedCost}</p>
                    <p>{resultList.policyCautions}</p>
                    <p>{resultList.emergencyResponse}</p>
                    <p>{resultList.memo}</p>
                    <p>{resultList.bathFlag}</p>
                    <p>{resultList.provisionFlag}</p>
                    <p>{resultList.petFlag}</p>
                    <p>{resultList.petWeight}</p>
                    <p>{resultList.dogBreed}</p>
                    <p>{resultList.emergencyFlag}</p>
                    <p>{resultList.entranceFlag}</p>
                    <p>{resultList.parkingFlag}</p>
                    <p>{resultList.inOutFlag}</p>
            <p>{resultList.imageList.map((v, i) => {
                return(
                    <img src={v.image} alt={v.image} />
                )
            })}</p>
                </>
            )}
            <hr />
            {resultList &&
                Object.keys(resultList).map((v, i) => {
                    return <h1>{v}</h1>;
                })}
        </div>
    );
};

export default Test;
