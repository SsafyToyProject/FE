import { useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import useInterval from "../../../hooks/useInterval";
import Input from "../../common/Input";
import axios from "axios";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function StudyBody() {
  //const { value, onChange } = useInput();
  const navigate = useNavigate(); // useNavigate hook 사용

  const [sessions, setSessionInfo] = useState([]); // 세션 정보 목록
  const [selectedSession, setSelectedSession] = useState(null); // 선택 세션 - 나중에 대기화면으로 넘길 때
  const [hasJoined, setHasJoined] = useState(false); // 참가 여부 판단할 변수
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간

  // 세션 만들기 페이지로 이동
  const goToCreateLiveSession = () => {
    navigate("/create-study"); // 임시로 스터디 개설 페이지로 연결
  };

  // 세션 정보 받아오기 get
  const getSessions = async () => {
    try {
      const response = await axios.get(`/session/study/${1}`);
      console.log(response.data.sessions);
      setSessionInfo(response.data.sessions);
    } catch (error) {
      console.error("세선 정보 불러오기 실패", error);
    }
  };

  // useInterval을 사용하여 매 분마다 현재 시간을 갱신
  useInterval(() => {
    setCurrentTime(new Date()); // 현재 시간 갱신
  }, 60000); // 1분마다 실행

  // 참가 버튼 클릭 시, 동작 메소드
  const joinSession = async (sessionId) => {
    try {
      // const response = await axios.post("/session/participate", {
      //   user_id: 1, // 예시 사용자 ID, 실제 데이터로 대체 필요
      //   session_id: sessionId,
      // });

      // API 호출이 성공하면 입장하기 버튼 활성화
      setHasJoined(true);
      setSelectedSession(sessionId); // 선택된 세션 ID 저장
    } catch (error) {
      alert("세션 참가 중 오류 발생. 다시 시도해 주세요.");
    }
  };

  const goToLiveSessionPage = () => {
    // 대기 페이지로 라우팅
    // navigate("/session/", { state:sessionInfo[idx]});
    const session = sessions.find((s) => s.session_id === selectedSession); // 선택된 세션 정보
    if (session) {
      navigate("/session/waiting", { state: session }); // 대기 화면으로 세션 정보 전달
    }
  };

  // 세션의 참가 가능 여부를 확인하는 함수 (5분 전까지)
  const canJoinSession = (startAt) => {
    const sessionStartTime = new Date(startAt); // 세션 시작 시간을 Date 객체로 변환
    const fiveMinutesBefore = new Date(sessionStartTime.getTime() - 5 * 60 * 1000); // 세션 시작 5분 전 시간 계산
    return currentTime < fiveMinutesBefore; // 현재 시간이 5분 전보다 이르면 true 반환
  };

  // 진행 중인 세션 필터링
  const ongoingSessions = sessions.filter((session) => new Date(session.end_at) > currentTime);

  // 종료된 세션 필터링
  const pastSessions = sessions.filter((session) => new Date(session.end_at) <= currentTime);

  useEffect(() => {
    try {
      getSessions();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <StudyBodyDiv>
      {/* 진행 중인 라이브 세션 상단 */}
      <Section>
        <SectionHeader>
          <h2>진행 중인 라이브</h2>
          <Button onClick={goToCreateLiveSession}>라이브 만들기</Button> {/* 고민 중인 부분 : 라이브 만들기 버튼 위치*/}
        </SectionHeader>

        <OngoingSessionsWrapper>
          {ongoingSessions.length > 0 ? (
            ongoingSessions.map((session) => (
              <LiveSessionCard key={session.session_id}>
                <p>
                  <strong>시작: </strong>
                  {session.start_at}
                </p>
                <p>
                  <strong>종료: </strong>
                  {session.end_at}
                </p>
                <ButtonGroup>
                  {hasJoined && selectedSession === session.session_id ? (
                    <ActionButton onClick={goToLiveSessionPage}>입장하기</ActionButton>
                  ) : canJoinSession(session.start_at) ? (
                    <ActionButton onClick={() => joinSession(session.session_id)}>참가</ActionButton>
                  ) : (
                    <ActionButton disabled>참가 불가</ActionButton>
                  )}
                </ButtonGroup>
              </LiveSessionCard>
            ))
          ) : (
            <p>진행 중인 세션이 없습니다.</p>
          )}
        </OngoingSessionsWrapper>
      </Section>

      <Hr />

      {/* 바디 하단 히스토리 */}
      <Section>
        <h2>히스토리</h2>
        <HistoryGrid>
          {pastSessions.length > 0 ? (
            pastSessions.map((session) => (
              <HistoryCard
                key={session.session_id}
                onClick={() => navigate(`/session/history/${session.session_id}`, { state: session })}
              >
                <p>
                  <strong>일시: </strong>
                  {session.start_at}
                </p>
              </HistoryCard>
            ))
          ) : (
            <p>종료된 세션이 없습니다.</p>
          )}
        </HistoryGrid>
      </Section>
    </StudyBodyDiv>
  );
}

const OngoingSessionsWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto; // 가로 스크롤을 가능하게 설정
  padding-bottom: 10px;
`;

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
