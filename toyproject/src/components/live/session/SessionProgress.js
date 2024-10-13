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
