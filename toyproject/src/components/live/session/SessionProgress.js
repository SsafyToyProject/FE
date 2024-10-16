import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressUserDetail from "./ProgressUserDetail";
import {
  StyledTable,
  TableHeader,
  TableCell,
  HeaderCell,
  TimeDisplay,
} from "../../../styles/live_styles/SessionProgressStyles";
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
  const { session_id } = useParams();

  useEffect(() => {
    const problemlist = [];
    for (let i = 0; i < 4; i++) {
      problemlist.push({
        problem_id: "p" + i,
        title: "문제제목",
      });
    }
    setProblemList(problemlist);
  }, [session_id]);

  useEffect(() => {
    const userlist = [];
    for (let i = 0; i < 12; i++) {
      userlist.push({
        user_id: "user" + i,
        session_id: session_id,
        problem: problemList,
      });
    }
    setUserList(userlist);
  }, [problemList]);

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <TimeDisplay>00:00</TimeDisplay>
            {problemList.map((item, idx) => (
              <TableHeader key={idx}>
                <HeaderCell>{item.problem_id}</HeaderCell>
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
