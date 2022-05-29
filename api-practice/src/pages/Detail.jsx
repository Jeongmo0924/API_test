import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { petDetailList } from "../slices/PetApiDetailSlice";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper"; // import required modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import KakaoMap from "../components/KakaoMap";
import Table from "../components/Table";
import PageWrapper from "../components/PageWrapper";
import DetailItem from "../components/DetailItem";
import Spinner from "../components/Spinner";
import ErrorView from "../components/ErrorView";

const AlbumWrapper = memo(styled.div`
  text-align: center;
  width: 100%;
  .mySwiper {
    padding: 64px 0 32px 0;
    * {
      --swiper-theme-color: var(--color-blue);
    }
    .slide {
      img {
        transition: 500ms all ease;
        border-radius: 4px;
        &:hover {
          transform: scale(1.1);
          z-index: 1000;
        }
      }
    }
  }
`);

const ItemContainer = memo(styled.div`
  .placeInfo {
    margin: 32px 0;
    display: flex;
    justify-content: space-between;
    .infos {
      margin-left: 32px;
      width: 50%;
      p {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        a {
          font-size: 14px;
          color: var(--color-text-gray);
        }
        .desc {
          width: 64px;
          font-size: 12px;
          color: var(--color-text-gray);
        }
        .keyword {
          margin-right: 8px;
          padding: 2px 4px;
          font-size: 14px;
          border-radius: 4px;
          background-color: var(--color-light-blue);
        }
      }
    }
  }
  .detailWrapper {
    margin: 12px 0;
    line-height: 2;
    .detailItem {
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
    }
  }
`);

const InfoTable = memo(styled(Table)`
  margin: 32px auto;
  width: 320px;
  border: 3px solid var(--color-blue);
  thead {
    font-weight: bold;
    color: #fff;
    background-color: var(--color-blue);
  }
  tbody {
    font-size: 12px;
  }
`);

const Detail = memo(() => {
  const params = useParams();
  const partCode = params.partCode;
  const contentNum = parseInt(params.contentNum);
  const dispatch = useDispatch();
  const { resultList, loading, error } = useSelector(
    (state) => state.petDetail
  );

  useEffect(() => {
    dispatch(petDetailList({ partCode, contentNum }));
  }, [dispatch, partCode, contentNum]);

  return (
    <PageWrapper>
      {loading && <Spinner visible={loading} />}
      {error ? (
        <ErrorView error={error} />
      ) : (
        <ItemContainer>
          <div className="descriptions">
            {resultList && (
              <>
                <AlbumWrapper>
                  <Swiper
                    rewind={true}
                    slidesPerView={3}
                    spaceBetween={50}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {resultList.imageList && resultList.imageList.map((item, index) => (
                      <SwiperSlide className="slide" key={index}>
                        <img src={item.image} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </AlbumWrapper>
                <div className="placeInfo">
                  <KakaoMap
                    width="420px"
                    height="420px"
                    lat={resultList?.latitude}
                    lng={resultList?.longitude}
                  />
                  <span className="infos">
                    <h1>{resultList.title}</h1>
                    <p>
                      <span className="desc">분야</span>
                      <span>{resultList.partName}</span>
                    </p>
                    <p>
                      <span className="desc">지역</span>
                      <span>{resultList.areaName}</span>
                    </p>
                    <p>
                      <span className="desc">키워드</span>
                      <span>
                        {resultList.keyword
                          .replaceAll(" ,", ",")
                          .split(",")
                          .map((elem, index) => (
                            <span className="keyword" key={index}>
                              {elem}
                            </span>
                          ))}
                      </span>
                    </p>
                    <p>
                      <span className="desc">주소</span>
                      <span>{resultList.address}</span>
                    </p>
                    <p>
                      <span className="desc">이용시간</span>
                      <span>{resultList.usedTime}</span>
                    </p>
                    <p>
                      <span className="desc">전화번호</span>
                      <span className="tel">{resultList.tel}</span>
                    </p>
                    <p>
                      <span className="desc">홈페이지</span>
                      <span>
                        <a href={resultList.homePage}>{resultList.homePage}</a>
                      </span>
                    </p>
                  </span>
                </div>
                <div className="detailWrapper">
                  {resultList.content && (
                    <div className="detailItem">
                      <h3>시설 소개</h3>
                      <ul>
                        {resultList.content.split(".").map((elem, index) => (
                          <p key={index}>{elem}</p>
                        ))}
                      </ul>
                    </div>
                  )}
                  <DetailItem
                    title="비품제공"
                    data={resultList.provisionSupply}
                  />
                  <DetailItem
                    title="반려동물 시설"
                    data={resultList.petFacility}
                  />
                  <DetailItem title="식당" data={resultList.restaurant} />
                  <DetailItem
                    title="주차장 수용"
                    data={resultList.parkingLog}
                  />
                  <DetailItem title="주요시설" data={resultList.mainFacility} />
                  <DetailItem title="이용요금" data={resultList.usedCost} />
                  <DetailItem
                    title="애견정책 및 주의사항"
                    data={resultList.policyCautions}
                  />
                  <DetailItem
                    title="응급상황 대처 여부"
                    data={resultList.emergencyResponse}
                  />
                  <DetailItem title="기타" data={resultList.memo} />
                  <div className="detailItem">
                    <h3>기타정보</h3>
                    <InfoTable>
                      <thead>
                        <tr>
                          <td>종류</td>
                          <td>여부</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>목욕시설 (Y/N)</td>
                          <td>{resultList.bathFlag}</td>
                        </tr>
                        <tr>
                          <td>비품제공 (Y/N)</td>
                          <td>{resultList.provisionFlag}</td>
                        </tr>
                        <tr>
                          <td>펫 동반식당 (Y/N)</td>
                          <td>{resultList.petFlag}</td>
                        </tr>
                        <tr>
                          <td>제한 몸무게 (kg)</td>
                          <td>{resultList.petWeight}</td>
                        </tr>
                        <tr>
                          <td>응급 수칙 (Y/N)</td>
                          <td>{resultList.emergencyFlag}</td>
                        </tr>
                        <tr>
                          <td>입장료 (Y/N)</td>
                          <td>{resultList.entranceFlag}</td>
                        </tr>
                        <tr>
                          <td>주차장 (Y/N)</td>
                          <td>{resultList.parkingFlag}</td>
                        </tr>
                        <tr>
                          <td>실내외 구분 (IN/OUT)</td>
                          <td>{resultList.inOutFlag}</td>
                        </tr>
                      </tbody>
                      <tfoot></tfoot>
                    </InfoTable>
                  </div>
                </div>
              </>
            )}
          </div>
        </ItemContainer>
      )}
    </PageWrapper>
  );
});

export default Detail;
