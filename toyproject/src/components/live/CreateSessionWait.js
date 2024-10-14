import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "../common/Nav";
import {
  Container,
  DetailBox,
  DetailItem,
  InfoBox,
  Time,
  Title,
  LeftBox,
  RightBox,
} from "../../styles/sessionWait_styles/CreateSessionWaitStyles";

function SessionWait() {
  const [participants, setParticipants] = useState([]);
  const [problems, setProblems] = useState([]);

  // props는 세션 정보
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state;

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
