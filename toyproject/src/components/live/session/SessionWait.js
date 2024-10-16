import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useInterval from "../../../hooks/useInterval";
import axios from "axios";
import dayjs from "dayjs";
import Nav from "../../common/Nav";
import {
  Container,
  DetailBox,
  DetailItem,
  InfoBox,
  Time,
  Title,
  LeftBox,
  RightBox,
} from "../../../styles/sessionWait_styles/CreateSessionWaitStyles";

function SessionWait() {
  const [now, setNow] = useState(dayjs()); // 현재 시간 상태
  const [participants, setParticipants] = useState([]); // 참가자 정보
  const [problems, setProblems] = useState([]); // 문제 정보

  const user_id = 3; // 임시
  const navigate = useNavigate();
  const location = useLocation();
  // const props = location.state;

  // 임시로 props 설정
  const props = {
    session_id: 1,
    start_at: "2024-10-16 22:45:00.0",
    end_at: "2024-10-17 04:38:00.0",
    problemCount: 4,
  };

  // 제한 시간 구하기
  const timeLimit = dayjs(props.end_at).diff(props.start_at, "m");
  const day = Math.floor(timeLimit / 60 / 24);
  const hour = Math.floor(timeLimit / 60) % 24;
  const minute = timeLimit % 60;
  const start_at = dayjs(props.start_at).format("YYYY.MM.DD HH:mm:ss");

  // 문제 정보, 참가자 정보 GET 요청 함수
  const fetchInfo = async () => {
    try {
      // 세션 아이디로 문제 id 가져오기
      const response = await axios.get(`/session/${props.session_id}`);

      // 각 문제 아이디별 상세 정보 한 번에 가져오기
      const problemRequests = response.data.session_problems.map((current) =>
        axios.get(`/crawl/problem/${current.problem_id}`)
      );

      // 모든 요청이 완료되면 상태 업데이트
      const problemResponses = await Promise.all(problemRequests);
      setProblems(problemResponses.map((res) => res.data));

      // 참가자 정보 저장하기
      setParticipants(response.data.session_participants);
    } catch (error) {
      console.error("문제 정보를 불러오는 중 에러 발생:", error);
    }
  };

  // 1초마다 현재 시간 체크
  useInterval(() => {
    setNow(dayjs()); // 현재 시간 갱신
    const timeDiff = dayjs(props.start_at).diff(now, "s");

    // 세션 시작 3분 전이면 문제 정보 요청 (임시로 10초 전으로 설정)
    if (timeDiff === 10) {
      fetchInfo();
    }

    // 세션 시작 시간이 되면 progress 화면으로 이동
    if (timeDiff === 0) {
      console.log(problems);
      navigate(`/session/${props.session_id}/${user_id}/progress`, { state: problems });
    }
  }, 1000);

  return (
    <>
      <Nav />
      <Container>
        <InfoBox>
          <LeftBox>
            <Title>시작일시</Title>
            <Time>{start_at}</Time>
          </LeftBox>
          <Title>/</Title>
          <RightBox>
            <Title>제한시간</Title>
            <Time>
              {day}일 {hour}시간 {minute}분
            </Time>
          </RightBox>
        </InfoBox>
        <DetailBox>
          <DetailItem>참가자 : {participants.join(", ")}</DetailItem>
          <DetailItem>문제 수: {props.problemCount}개</DetailItem>
        </DetailBox>
      </Container>
    </>
  );
}

export default SessionWait;
