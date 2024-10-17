import styled from "styled-components";

export const InviteContainer = styled.div`
  background-color: #e6e6fa;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 500px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const StudyInfo = styled.h2`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

export const AcceptButton = styled(Button)`
  background-color: #4169e1;
  color: white;
`;
