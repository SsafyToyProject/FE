import React from "react";
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
  key,
}) {
  // 임시 데이터: 실제 데이터는 props 또는 상태로 전달받아 사용해야 합니다.
  const performance = Math.floor(Math.random() * 100); // 퍼포먼스는 랜덤 수치로 예시
  const language = "JAVA"; // 언어는 임시로 설정

  return (
    <>
      <TableCellWrapper key={key}>
        <StatusText>SUCCESS!!</StatusText>
        <InfoText>사용 언어: {language}</InfoText>
        <InfoText>실행 시간: {performance}ms</InfoText>
      </TableCellWrapper>
    </>
  );
}
