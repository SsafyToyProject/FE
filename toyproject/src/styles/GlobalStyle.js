import { createGlobalStyle } from "styled-components";

// 글로벌 스타일. 현재 전체 어플리케이션의 기본 마진과 패딩을 0로 설정함.
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
