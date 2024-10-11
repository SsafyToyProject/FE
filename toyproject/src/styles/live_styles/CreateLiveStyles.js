import styled from "styled-components";
import { StyledInput } from "../../components/common/Input";

export const Container = styled.form`
  position: absolute;
  width: 600px;
  height: 800px;
  padding: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto; /* 내부에 스크롤 생성 */
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const CustomInput = styled(StyledInput)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DifficultyList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
`;

export const DifficultyItem = styled.li`
  width: 100%;
  margin-top: 8px;
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
  }
`;
