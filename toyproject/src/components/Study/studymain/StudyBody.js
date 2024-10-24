import { useEffect, useState } from "react";
import useInterval from "../../../hooks/useInterval";
import axios from "axios";
import dayjs from "dayjs";

import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function StudyBody({ studyInfo }) {
  const navigate = useNavigate(); // useNavigate hook 사용

  const [sessions, setSessionInfo] = useState([]); // 세션 정보 목록
  const [joinedSessions, setJoinedSessions] = useState({}); // 참가한 세션을 저장하는 객체
  const [currentTime, setCurrentTime] = useState(dayjs()); // 현재 시간

  const params = useParams();
  const userInfo = window.sessionStorage;
  const user_id = userInfo.getItem("userId");

  // const location = useLocation();
  // const studyInfo = location.state;

  // 세션 만들기 페이지로 이동
  const goToCreateLiveSession = () => {
    navigate(`/live/session/${studyInfo.study_id}`);
  };

  // 세션 입장하기 페이지로 이동
  const goToLiveSessionPage = (session) => {
    navigate(`/session/${session.session_id}/${user_id}/wait`, { state: session });
  };

  // 입장하기 - 참가 (or 참가 불가) 를 구분하기 위한 메소드
  const checkJoin = (session) => {
    const participants = session.session_participants;
    if (Array.isArray(participants)) {
      return participants.some((participant) => participant.user_id === Number(user_id));
    }
    return false;
  };

  // 참가 버튼
  const joinSession = async (sessionId) => {
    try {
      const response = await axios.post("/session/participate", {
        user_id: user_id,
        session_id: sessionId,
      });

      setJoinedSessions((prev) => ({ ...prev, [sessionId]: true }));
    } catch (error) {
      console.error("세션 참가 중 오류 발생:", error);
      alert("세션 참가 중 오류 발생. 다시 시도해 주세요.");
    }
  };

  // useInterval => 현재 시간
  useInterval(() => {
    setCurrentTime(dayjs());
  }, 60 * 1000); // 1분마다 실행

  // 세션 참가 버튼 5분 체크
  const canJoinSession = (startAt) => {
    const sessionStartTime = dayjs(startAt);
    const fiveMinutesBefore = sessionStartTime.subtract(5, "minute");
    return currentTime.isBefore(fiveMinutesBefore); // 현재 시간이 5분 전보다 이전인지 확인
  };

  // 진행 중인 세션 필터링
  const ongoingSessions = sessions.filter((session) => dayjs(session.end_at).isAfter(currentTime));

  // 종료된 세션 필터링
  const pastSessions = sessions.filter((session) => dayjs(session.end_at).isBefore(currentTime));

  useEffect(() => {
    // 세션 정보 받아오기 (컴포넌트가 처음 렌더링될 때 한 번만 실행)
    const getSessions = async () => {
      try {
        const response = await axios.get(`/session/study/${params.study_id}`);
        console.log(response.data.sessions);
        setSessionInfo(response.data.sessions); // 세션 정보 업데이트 후
      } catch (error) {
        console.error("세션 정보 불러오기 실패", error);
      }
    };

    getSessions(); // 세션 정보 가져오기
  }, [studyInfo]); // 새로고침 또는 studyInfo가 변경될 때 한 번만 실행

  // 세션 참가 여부 확인 (sessions 상태가 업데이트된 후 실행)
  useEffect(() => {
    if (sessions.length > 0) {
      const updatedJoinedSessions = {};
      sessions.forEach((session) => {
        if (checkJoin(session)) {
          updatedJoinedSessions[session.session_id] = true;
        }
      });
      setJoinedSessions(updatedJoinedSessions); // 참가 여부를 저장
    }
  }, [sessions]); // 세션 정보가 업데이트될 때 한 번 실행

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
                  {dayjs(session.start_at).format("YYYY-MM-DD HH:mm")}
                </p>
                <p>
                  <strong>종료: </strong>
                  {dayjs(session.end_at).format("YYYY-MM-DD HH:mm")}
                </p>
                <ButtonGroup>
                  {/* 각 세션별로 참가 여부를 joinedSessions에서 확인 */}
                  {joinedSessions[session.session_id] ? (
                    <ActionButton onClick={() => goToLiveSessionPage(session)}>입장하기</ActionButton>
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
                onClick={() => navigate(`/session/${session.session_id}/${user_id}/progress`, { state: session })}
              >
                <p>{dayjs(session.start_at).format("YYYY-MM-DD")}</p>
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
  grid-template-columns: repeat(5, 1fr);
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
