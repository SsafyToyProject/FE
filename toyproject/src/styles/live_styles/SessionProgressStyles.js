import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* 균등한 칸 배치 */
  padding: 20px;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f8f8f8;
  font-weight: bold;
  text-align: center;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  word-wrap: break-word; /* 내용이 길어질 때 줄바꿈 */
  align-items: center;
  justify-content: center;
  font-size: 26px;
`;

export const HeaderCell = styled.div`
  text-align: center;
  font-size: 26px;
`;

export const TimeDisplay = styled.div`
  text-align: center;
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 10px;
`;
