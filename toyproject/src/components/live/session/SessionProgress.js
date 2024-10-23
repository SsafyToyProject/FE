import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProgressUserDetail from "./ProgressUserDetail";
import {
  StyledTable,
  TableHeader,
  TableCell,
  HeaderCell,
  TimeDisplay,
} from "../../../styles/live_styles/SessionProgressStyles";
import axios from "axios";
/*
트래커 fetch url: /tracker/info/{session_id}/{user_id}/{problem_id}
요청 파라미터: {
	"session_id" : int,
	"user_id" : int (userId),
	"problem_id" : int
}

답변 파라미터: {
	"num_elements":int,
	"trackers": [{
		"solved_at": timestamp,
		"performance": int,
		"language": string,
		"code_link": string,
		"description": string,
	}],
}

즉, 특정 유저의 특정 문제에 대해 정보를 하나 가지고 온다. 
그러니깐, 1분마다 (사람수 * 문제 수) 만큼의 요청이 매번 필요한 느낌?
*/
function SessionProgress() {
  const [userList, setUserList] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [minute, setMinute] = useState();
  const [seconds, setSeconds] = useState();
  const [update, setUpdate] = useState(false);
  const prevMinute = useRef(0);
  const { session_id, user_id } = useParams();
  const location = useLocation();
  const sessionInfo = location.state;

  // const sessionInfo = {
  //   end_at: "2024-10-21 21:38:00.0",
  //   problem_pool: "S4 S4 S4 S4 ",
  //   query_id: 1,
  //   session_problems: [
  //     {
  //       problem_id: 2670,
  //     },
  //     {
  //       problem_id: 10845,
  //     },
  //     {
  //       problem_id: 9012,
  //     },
  //     {
  //       problem_id: 2164,
  //     },
  //   ],
  //   session_id: 1,
  //   start_at: "2024-10-16 03:38:00.0",
  //   participants_cnt: 0,
  //   problems_cnt: 4,
  //   session_participants: [],
  // };

  // 문제 세팅 => 지금은 임의의 문제인데,문제 리스트 가져와서 세팅
  // 추가로 problem_id에 따라서 조회를 하고 세팅해줘야 할듯?
  async function fetch() {
    const problemlist = [];
    for (let i = 0; i < sessionInfo.session_problems.length; i++) {
      const response = await axios.get(`/crawl/problem/${sessionInfo.session_problems[i].problem_id}`);

      problemlist.push({
        problem_id: sessionInfo.session_problems[i].problem_id,
        title: response.data.title,
      });
    }
    setProblemList(problemlist);
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    const userlist = [];
    for (let i = 0; i < sessionInfo.participants_cnt; i++) {
      userlist.push({
        user_id: user_id,
        session_id: session_id,
        problem: problemList,
      });
    }
    setUserList(userlist);
  }, [problemList]);

  function parseDateString(dateString) {
    // 문자열의 공백을 T로 변환하여 ISO 8601 형식으로 만듦
    const isoString = dateString.replace(" ", "T");

    // Date 객체로 변환
    return new Date(isoString);
  }

  useEffect(() => {
    // 타이머 업데이트 함수
    function updateTimer() {
      const currentTime = new Date();
      const endtime = parseDateString(sessionInfo.end_at);
      const timeDifference = endtime - currentTime;

      // 남은 시간이 0보다 작은 경우 타이머 종료
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        console.log("Time is up!");
        return;
      }

      // 남은 시간을 분 단위로 변환
      const min = Math.floor(timeDifference / (1000 * 60));
      const second = Math.floor((timeDifference % (1000 * 60)) / 1000);
      setMinute(min);
      setSeconds(second);

      if (prevMinute.current !== min) {
        console.log(prevMinute.current + " " + min + " " + update);
        prevMinute.current = min;
        setUpdate((prevUpdate) => !prevUpdate);
      }
    }
    const timerInterval = setInterval(updateTimer, 1000);

    // 컴포넌트가 언마운트될 때 setInterval을 정리
    return () => clearInterval(timerInterval);
  }, []); // 빈 배열을 넣어서 한 번만 실행되게 함

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <TimeDisplay>
              {minute}:{seconds}
            </TimeDisplay>
            {problemList.map((item, idx) => (
              <TableHeader key={idx}>
                <HeaderCell>{item.problem_id}</HeaderCell>
                <HeaderCell>{item.title}</HeaderCell>
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {userList.map((item, iidx) => (
            <tr key={iidx}>
              <TableCell>user: {item.user_id}</TableCell>
              {item.problem.map((detail, didx) => (
                <TableCell key={didx}>
                  <ProgressUserDetail
                    user_id={item.user_id}
                    session_id={item.session_id}
                    problem_id={detail.problem_id}
                    index={didx}
                    update={update}
                  />
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
}

export default SessionProgress;
