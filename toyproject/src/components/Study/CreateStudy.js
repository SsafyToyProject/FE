import { useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateStudy() {
  const studyName = useInput();
  const description = useInput();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 폼 제출 시 처리 로직
    console.log("Study Created:", studyName.value, description.value);
    const session = window.sessionStorage;
    // 실패 성공 처리 >> 성공 시, 가입한 스터디 목록 main / 실패 시, 경고문
    const response = await axios.post("/study/register", {
      owner_id: session.getItem("userId"),
      name: studyName.value,
      description: description.value,
    });
  };

  return (
    <CreateStudyDiv>
      <h2>스터디 만들기</h2>
      <Form onSubmit={handleSubmit}>
        <Label>스터디명</Label>
        <NameInput type="text" {...studyName} placeholder="스터디 이름을 입력하세요" />

        <Label>스터디 설명</Label>
        <Textarea {...description} placeholder="스터디 설명을 입력하세요" />

        <Button type="submit">스터디 생성</Button>
        {/* */}
      </Form>
    </CreateStudyDiv>
  );
}

const CreateStudyDiv = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const NameInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #357ab7;
  }
`;

export default CreateStudy;
