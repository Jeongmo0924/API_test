import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  margin-top: 64px;
  padding: 96px 0;
  background-color: var(--color-blue);
  line-height: 2;
  text-align: center;
  * {
    color: #fff;
  }
  a:hover {
    color: #fff !important;
  }
  .names {
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <address>
        copyright &copy;{" "}
        <a href="http://pettravel.kr/petapi/api#">pettravel.kr</a>{" "}
      </address>
      <a
        href="https://github.com/Jeongmo0924/API_test/tree/main/api-practice"
        className="names"
      >
        by. fullstack team 3
        <br />
        박정모, 서소희, 신지섭
      </a>
    </FooterContainer>
  );
};

export default Footer;
