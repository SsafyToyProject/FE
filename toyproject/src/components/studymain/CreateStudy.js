import { useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CreateStudy() {
    const { studyName, changeStudyName, clearStudyName } = useInput();
    const { description, changeDescription, clearDescription } = useInput();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼 제출 시 처리 로직
        console.log("Study Created:", { studyName, description });
        // 생성하는 api 를 호출해야 함 post
        // 생성 함수 리스폰스로 id 받냐
    };

    return (
        <CreateStudyDiv>
            <h2>스터디 만들기</h2>
            <Form onSubmit={handleSubmit}>
                <Label>스터디명</Label>
                <NameInput
                    type="text"
                    value={studyName}
                    onChange={changeStudyName}
                    placeholder="스터디 이름을 입력하세요"
                />

                <Label>스터디 설명</Label>
                <Textarea value={description} onChange={changeDescription} placeholder="스터디 설명을 입력하세요" />

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
