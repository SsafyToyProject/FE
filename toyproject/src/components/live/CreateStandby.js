import { useState, useEffect } from "react";
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
} from "../../styles/livestandby_styles/CreateStandbyStyles";

function Standby() {
  const [sessionData, setSessionData] = useState({
    startTime: "",
    timeLimit: "",
    participants: [],
    problemCount: 0,
  });

  useEffect(() => {
    // 여기서 서버로부터 데이터를 가져오는 비동기 함수를 호출
    // 임시로 setTimeout을 사용
    const fetchSessionData = () => {
      setTimeout(() => {
        setSessionData({
          startTime: "24.10.01 21:00",
          timeLimit: "2시간",
          participants: ["아이디 1", "아이디 2", "아이디 3"],
          problemCount: 4,
        });
      }, 1000);
    };

    fetchSessionData();
  }, []);

  return (
    <>
      <Nav />
      <Container>
        <InfoBox>
          <LeftBox>
            <Title>시작시간</Title>
            <Time>{sessionData.startTime}</Time>
          </LeftBox>
          <Title>/</Title>
          <RightBox>
            <Title>제한시간</Title>
            <Time>{sessionData.timeLimit}</Time>
          </RightBox>
        </InfoBox>
        <DetailBox>
          <DetailItem>참가자 : {sessionData.participants.map((p) => p + ", ")}</DetailItem>
          <DetailItem>문제 수: {sessionData.problemCount}개</DetailItem>
        </DetailBox>
      </Container>
    </>
  );
}
export default Standby;
