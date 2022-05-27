import React, { memo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";

import PetApi from "./pages/PetApi";
// import Test from "./Test";
import Detail from "./pages/Detail";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";

const HeaderContainer = styled.header`
  cursor: pointer;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 9999;
  hr {
    border: none;
    border-top: 3px solid #16b;
  }
  h1 {
    text-align: center;
    color: #16b;
  }
`;

const App = memo(() => {
  const Navigate = useNavigate();
  const onClick = () => Navigate("/");

  return (
    <div style={{ position: "relative" }}>
      <HeaderContainer onClick={onClick}>
        <h1>강원도 반려동물 동반관광 API</h1>
        <hr />
      </HeaderContainer>
      <Routes>
        <Route path="/" element={<PetApi />} />
        <Route path="/detail/:partCode/:contentNum" element={<Detail />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
});

export default App;
