// 메인 화면에 들어갈 설명 요소
import styled from "styled-components";

// CSS 지정
const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Content = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid;
  border-radius: 12px;
`;

function Element({ title, des }) {
  return (
    <Container>
      <Content>
        <h4>{title}</h4>
        <p>{des}</p>
      </Content>
    </Container>
  );
}

export default Element;
