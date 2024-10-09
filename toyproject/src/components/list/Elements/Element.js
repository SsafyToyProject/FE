// 메인 화면에 들어갈 설명 요소
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// CSS 지정
const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid;
  border-radius: 12px;
`;

function Element({ title, des, studyId }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <h4>{title}</h4>
        <p>{des}</p>
        {/* 입장하기 클릭시 스터디 화면으로 이동 */}
        <button
          onClick={() => {
            navigate(`/${studyId}`);
          }}
        >
          입장하기
        </button>
      </Content>
    </Container>
  );
}

export default Element;
