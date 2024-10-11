import styled from "styled-components";
import { StyledInput } from "../../components/common/Input";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const QueryListContainer = styled.div`
  min-height: 50px; // 최소 높이 설정
  border: 1px dashed #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #f4f4f4;
  transition: all 0.3s ease;

  // 아이템이 없을 때 보일 기본 메시지 스타일
  &::before {
    content: "${(props) => (props.isEmpty ? "선택된 태그가 없습니다" : "")}";
    color: #999;
    font-size: 0.9rem;
  }
`;

export const QueryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;

export const QueryItem = styled.li`
  padding: 8px 12px;
  background-color: #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bdbdbd;
  }
`;

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CustomInput = styled(StyledInput)`
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #6200ea;
    box-shadow: 0 0 8px rgba(98, 0, 234, 0.2);
    outline: none;
  }

  &::placeholder {
    color: #aaa;
    font-size: 0.9rem;
  }

  &:hover {
    border-color: #999;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;

  &:hover {
    background-color: #4500a7;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #e57373;

  &:hover {
    background-color: #d32f2f;
  }
`;
