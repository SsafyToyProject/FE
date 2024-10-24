import { useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateStudy() {
  const studyName = useInput();
  const description = useInput();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Study Created:", studyName.value, description.value);
    const session = window.sessionStorage;

    try {
      const response = await axios.post("/api/study/register", {
        owner_id: session.getItem("userId"),
        name: studyName.value,
        description: description.value,
      });

      alert("스터디가 성공적으로 생성되었습니다.");

      // 스터디 생성 후, study-list 페이지로 이동
      navigate("/study-list");
    } catch (error) {
      alert("스터디 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
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
