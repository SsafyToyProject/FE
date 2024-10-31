import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProgressUserDetail from "./ProgressUserDetail";
import {
  StyledTable,
  TableHeader,
  TableCell,
  HeaderCell,
  TimeDisplay,
} from "../../../styles/live_styles/SessionProgressStyles";
import axios from "axios";

function SessionProgress() {
  const [sessionInfo, setSessionInfo] = useState(null); // 초기 값을 null로 설정
  const [userList, setUserList] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [minute, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [update, setUpdate] = useState(false);
  const prevMinute = useRef(0);
  const navigate = useNavigate();
  const { session_id, user_id } = useParams();
  const session = useLocation();

  useEffect(() => {
    setSessionInfo(session.state);
  }, [session]);

  useEffect(() => {
    if (sessionInfo && sessionInfo.session_problems) {
      async function fetchProblems() {
        const problemlist = [];
        for (let i = 0; i < sessionInfo.session_problems.length; i++) {
          const response = await axios.get(`/api/crawl/problem/${sessionInfo.session_problems[i].problem_id}`);
          problemlist.push({
            problem_id: sessionInfo.session_problems[i].problem_id,
            title: response.data.title,
          });
        }
        setProblemList(problemlist);
      }
      fetchProblems();
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (problemList.length > 0) {
      async function fetchUsers() {
        const userlist = [];
        for (let i = 0; i < sessionInfo.session_participants.length; i++) {
          const response = await axios.get(`/api/user/${sessionInfo.session_participants[i].user_id}`);
          userlist.push({
            handle: response.data.handle,
            user_id: sessionInfo.session_participants[i].user_id,
            session_id: session_id,
            problem: problemList,
          });
        }
        setUserList(userlist);
      }
      fetchUsers();
    }
  }, [problemList]);

  function parseDateString(dateString) {
    const isoString = dateString.replace(" ", "T");
    return new Date(isoString);
  }

  useEffect(() => {
    if (!sessionInfo) return;

    function updateTimer() {
      const currentTime = new Date();
      const endtime = parseDateString(sessionInfo.end_at);
      const timeDifference = endtime - currentTime;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        console.log("Time is up!");
        return;
      }

      const min = Math.floor(timeDifference / (1000 * 60));
      const second = Math.floor((timeDifference % (1000 * 60)) / 1000);
      setMinute(min);
      setSeconds(second);

      if (prevMinute.current !== min) {
        prevMinute.current = min;
        setUpdate((prevUpdate) => !prevUpdate);
      }
    }
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [sessionInfo]);

  // sessionInfo가 없으면 로딩 상태를 표시
  if (!sessionInfo) {
    return <div>Loading session information...</div>;
  }

  const onReturnClick = () => {
    navigate(-1, {
      replace: true,
    });
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <TimeDisplay>
            {minute != 0 && seconds != 0 ? `${minute}:${seconds}` : <button onClick={onReturnClick}>되돌아가기</button>}
          </TimeDisplay>
          {problemList.map((item, idx) => (
            <TableHeader key={idx}>
              <a href={`https://www.acmicpc.net/problem/${item.problem_id}`} target="_blank">
                {item.problem_id}
              </a>
              <HeaderCell>{item.title}</HeaderCell>
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {userList.map((item, iidx) => (
          <tr key={iidx}>
            <TableCell>user: {item.handle}</TableCell>
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
  );
}

export default SessionProgress;
