import Nav from "../common/Nav";
import Element from "./Elements/Element";
import styled from "styled-components";

// CSS 지정
const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Main() {
  return (
    <div>
      {/* 헤더 */}
      <Nav />
      <Title>
        <h1>프로그램 이름</h1>
      </Title>
      {/* 스터디 정보 나타내기 */}
      <Content>
        <Element title="어떤 프로그램인가요?" des="프로그램 설명..." />
        <Element title="사용하는 방법" des="사용 방법 설명..." />
        <Element title="사용할 대상" des="사용할 대상 설명..." />
        <Element title="만든이들" des="프로그램 만든사람..." />
      </Content>
    </div>
  );
}

export default Main;
