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
  const [sessionInfo, setSessionInfo] = useState([]); // 세션 정보
  const [timeDiff, setTimeDiff] = useState(-1); // 남은 시간 상태

  const user_id = 3; // 임시
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state;

  // console.log(props);

  // 임시로 props 설정
  // const props = {
  //   session_id: 1,
  //   start_at: "2024-10-22 16:49:00.0",
  //   end_at: "2024-10-17 04:38:00.0",
  //   problemCount: 4,
  // };

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

      // 세션 정보 저장
      setSessionInfo(response.data);

      // 참가자 정보 저장하기
      setParticipants(response.data.session_participants);
    } catch (error) {
      alert("세션 정보를 불러오는 중 에러 발생");
    }
  };

  // 1초마다 현재 시간 체크
  useInterval(() => {
    setNow(dayjs()); // 현재 시간 갱신
    const timeDiffInSeconds = dayjs(props.start_at).diff(now, "s"); // 남은 시간 계산
    setTimeDiff(timeDiffInSeconds); // 남은 시간 상태 업데이트

    // 세션 시작 3분 전이면 문제 정보 요청 (임시로 10초 전으로 설정)
    if (timeDiff === 60) {
      fetchInfo();
      console.log(sessionInfo);
    }

    // 세션 시작 시간이 되면 progress 화면으로 이동
    if (timeDiff === 0) {
      fetchInfo();
      console.log(sessionInfo);
      alert("시작합니다~");
      navigate(`/session/${props.session_id}/${user_id}/progress`, { state: sessionInfo });
    }
  }, 1000);

  // timeDiff를 시/분/초로 변환
  const hours = Math.floor(timeDiff / 3600);
  const minutes = Math.floor((timeDiff % 3600) / 60);
  const seconds = timeDiff % 60;

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
          <DetailItem>
            남은 시간: {hours}시간 {minutes}분 {seconds}초
          </DetailItem>
        </DetailBox>
      </Container>
    </>
  );
}

export default SessionWait;
