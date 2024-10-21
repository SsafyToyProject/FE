import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/*
"num_elements": int,
"trackers": [
  {
    "solved_at": timestamp,
    "performance": int,
    "language": string,
    "code_link": string,
    "description": string,
  }
],
*/

const TableCellWrapper = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  background-color: #f5f5f5; /* 배경 색상으로 강조 */
`;

const StatusText = styled.span`
  font-weight: bold;
  color: green;
  font-size: 16px;
`;

const InfoText = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #555;
`;

export default function ProgressUserDetail({
  user_id,
  session_id,
  problem_id,
  index,
  update,
}) {
  const [data, setData] = useState({
    num_elements: 0,
    trackers: [
      {
        solved_at: null,
        performance: null,
        language: null,
        code_link: null,
        description: null,
      },
    ],
  });

  async function fetch() {
    try {
      const response = await axios.get(
        `/tracker/info/${session_id}/${user_id}/${problem_id}`
      );
      //console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // 이제 이 fetch가 1분에 한번씩 호출되는 로직 추가해야함.

    fetch();
    console.log("update");
  }, [update]);

  return (
    <>
      <TableCellWrapper key={index}>
        <StatusText>
          {data.trackers[0].solved_at != null ? "SUCCESS!!" : "FAILED.."}
        </StatusText>
        <InfoText>사용 언어: {data.trackers[0].language}</InfoText>
        <InfoText>실행 시간: {data.trackers[0].performance}ms</InfoText>
      </TableCellWrapper>
    </>
  );
}
