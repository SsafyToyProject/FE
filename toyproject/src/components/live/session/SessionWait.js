import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  /*
SessionWait에서 필요한 것: session_id, user_id (context로 부터 가져오기)
5분전에 가져올 수 있는 정보: (problem_id, difficulty, title) 문제정보
prop으로 progress에 넘겨 줘야 할것: problem list

문제 정보조회 fetch url: /crawl/problem/{problemID}
요청 파라미터: X
답변 파라미터: 
{
    "problem_id":int,
    "difficulty":int,
    "title":string,
}

*/
  const [now, setNow] = useState(1);
  const [participants, setParticipants] = useState([]);
  const [problems, setProblems] = useState([]);

  // props는 세션 정보
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state;

  // 문제 정보 GET 요청
  const fetchProblems = async () => {
    try {
    } catch (error) {
      console.error("문제 정보를 불러오는 중 에러 발생:", error);
    }
  };

  // 참가자 정보 GET 요청
  const fetchSession = async () => {
    try {
    } catch (error) {
      console.error("문제 정보를 불러오는 중 에러 발생:", error);
    }
  };

  // 1초마다 현재시간 체크
  useInterval(() => {
    setNow(dayjs().diff(dayjs("2021-10-11 10:30:25.495", "YYYY-MM-DD HH:mm:ss.SSS"), "s"));
    // 3분 차이나면 문제 정보 요청
    fetchProblems();
    // 0초 차이나면 progress로 이동
    fetchSession();
  }, 1000);

  // 시작 5분 전에 문제 정보를 받아올 것 / 참가자 정보도 받아올 것
  // useEffect(() => {
  //   const fetchProblems = async () => {
  //     try {
  //     } catch (error) {
  //       console.error("문제 정보를 불러오는 중 에러 발생:", error);
  //     }
  //   };

  //   fetchProblems();
  // }, []);

  // 시작 시간이 되면 progress화면으로 이동, session_id와 user_id를 param으로 넘기고, 세션 정보를 prop으로 넘기기

  return (
    <>
      <Nav />
      <Container>
        <InfoBox>
          <LeftBox>
            <Title>시작시간</Title>
            <Time>{/*props.startTime*/}</Time>
          </LeftBox>
          <Title>/</Title>
          <RightBox>
            <Title>제한시간</Title>
            <Time>{/*props.timeLimit*/}</Time>
          </RightBox>
        </InfoBox>
        <DetailBox>
          {/* 참가자 정보는 5분전 혹은 실시간으로 세션id로 요청하기 */}
          <DetailItem>참가자 : {participants.map((p) => p + ", ")}</DetailItem>
          <DetailItem>문제 수: {/*props.problemCount*/}개</DetailItem>
        </DetailBox>
      </Container>
    </>
  );
}
export default SessionWait;
