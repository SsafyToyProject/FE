import { useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import Input from "../../common/Input";
import axios from "axios";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function StudyBody() {
  const { value, onChange } = useInput();
  const navigate = useNavigate(); // useNavigate hook 사용

  const [sessionInfo, SetSessionInfo] = useState({}); // 세션 정보 목록
  const [selectedSession, setSelectedSession] = useState(null); // 선택 세션 - 나중에 대기화면으로 넘길 때
  const [hasJoined, SetHasJoined] = useState(false); // 참가 여부 판단할 변수

  // 세션 만들기 페이지로 이동
  const goToCreateLiveSession = () => {
    navigate("/create-study"); // 임시로 스터디 개설 페이지로 연결
  };

  // 세션 정보 받아오기 get
  const getSessions = async () => {
    const response = await axios.get(`/session/study/${1}`);
    console.log(response.data.sessions);
    SetSessionInfo(response.data.sessions);
  };

  // 참가 버튼 클릭 시, 동작 메소드
  const joinSession = async (sessionId) => {
    // api 호출
    // url : /session/participate
    //  request 데이터
    // {
    //	"user_id": int,
    //  "session_id": int,
    // }

    try {
    } catch (error) {}

    SetHasJoined(true);
  };

  const goToLiveSessionPage = () => {
    // 대기 페이지로 라우팅
    // navigate("/session/", { state:sessionInfo[idx]});
  };

  // 1016 할 일
  // 참가일 때, 호출이랑 입장하기일 때, 라우팅하는 메소드 선언해서
  // 각 버튼 onClickEvent로 넣어주고 조건문대로 const joinSession 상태대로

  useEffect(() => getSessions(), []);

  return (
    <StudyBodyDiv>
      {/* 진행 중인 라이브 세션 상단 */}
      <Section>
        <SectionHeader>
          <h2>진행 중인 라이브</h2>
          <Button onClick={goToCreateLiveSession}>라이브 만들기</Button> {/* 고민 중인 부분 : 라이브 만들기 버튼 위치*/}
        </SectionHeader>

        <LiveSessionCard>
          {/* <strong>라이브세션제목</strong> */}
          <p>
            {/* 고민 중인 부분 : 라이브명에 대한 이야기... */}
            <strong>시작 : </strong>2024.10.03 21:00
          </p>
          <p>
            <strong>종료: </strong>2024.10.03 22:30
          </p>
          <ButtonGroup>
            {hasJoined ? (
              <ActionButton onClick={goToLiveSessionPage}>입장하기</ActionButton>
            ) : (
              <ActionButton>참가</ActionButton>
            )}

            {/* 이것도 useState를 써서 버튼을 눌렀냐 안 눌렀냐를 알 수 있잖아 그러면 누른 상태일 때 useEffect 써서 true가 되면 입장하기 hidden을 빼기 */}
          </ButtonGroup>
        </LiveSessionCard>
      </Section>

      <Hr />

      {/* 바디 하단 히스토리 */}
      <Section>
        <h2>히스토리</h2>
        <HistoryGrid>
          <HistoryCard>
            {/* <strong>라이브세션제목</strong> */}
            2024.10.03
          </HistoryCard>
          <HistoryCard>2024.10.02</HistoryCard>
          <HistoryCard>2024.10.01</HistoryCard>
        </HistoryGrid>
      </Section>
    </StudyBodyDiv>
  );
}

const StudyBodyDiv = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 120px;
  background-color: white;
`;

const Section = styled.div`
  margin-bottom: 20px;
  min-width: 300px;
`;

const SectionHeader = styled.div`
  display: flex;
  margin: 0px 10px 0px 0px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  height: fit-content;
  padding: 10px 15px;
  margin: 10px 10px;

  background-color: #637381;
  border: none;
  border-radius: 5px;

  color: white;
  font-size: medium;

  cursor: pointer;
`;

const LiveSessionCard = styled.div`
  width: fit-content;
  background-color: #e0e7ff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  /* background-color: ${(props) => (props.primary ? "#3b82f6" : "#e11d48")}; */
  background-color: #3b82f6;
  /* visibility: $hidden;  이것도 위의 방식대로 입장하기 버튼을 hidden으로 뒀다가 나중에 참가가 true가 되면 hidden 삭제하는 형식*/
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 20px 10px 20px 0px;
  background-color: gray;
  height: 0.5;
`;

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  /* padding: 10px 10px; */
`;

const HistoryCard = styled.div`
  width: 150px;
  background-color: #e0e7ff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export default StudyBody;
