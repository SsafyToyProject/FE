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
  font-size: 14px;
  background-color: ${(props) => (props.$isSuccess ? "#28a745" : "#dc3545")}; /* 배경 색상으로 강조 */

  /* 부모 div를 꽉 채우기 위한 설정 */
  width: 100%;
  height: 100%;
  box-sizing: border-box; /* 패딩이 전체 크기에 포함되도록 설정 */

  /* Flexbox 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusText = styled.span`
  font-weight: bold;
  color: ${(props) => (props.$isSuccess ? "#000000" : "#f8d7da")};
  font-size: 16px;
  text-align: center;
`;

const InfoText = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #555;
  text-align: center;
`;

export default function ProgressUserDetail({ user_id, session_id, problem_id, index, update }) {
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
      const response = await axios.get(`/api/tracker/info/${session_id}/${user_id}/${problem_id}`);
      //console.log(response.data);
      setData(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    // 이제 이 fetch가 1분에 한번씩 호출되는 로직 추가해야함.

    fetch();
    // console.log("update");
  }, [update]);

  return (
    <>
      <TableCellWrapper key={index} $isSuccess={data.trackers[0].solved_at != null ? true : false}>
        <StatusText $isSuccess={data.trackers[0].solved_at != null ? true : false}>
          {data.trackers[0].solved_at != null ? "SUCCESS!!" : "FAILED.."}
        </StatusText>
        {data.trackers[0].solved_at != null ? <InfoText>사용 언어: {data.trackers[0].language}</InfoText> : null}
        {data.trackers[0].solved_at != null ? <InfoText>실행 시간: {data.trackers[0].performance}ms</InfoText> : null}
      </TableCellWrapper>
    </>
  );
}
