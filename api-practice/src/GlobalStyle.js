import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: #000;
    transition: 300ms all ease;
    &:hover {
      color: var(--color-blue) !important;
    }
  }
  h1 {
    padding: 32px 0;
  }
`;

export default GlobalStyle;
