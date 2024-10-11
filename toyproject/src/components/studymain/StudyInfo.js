import { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";

function StudyInfo() {
    const { value, onChange } = useInput();

    return (
        <>
            <StudyInfoDiv>
                <InfoDiv>
                    <h2>스터디명</h2>
                    <p>
                        <strong>방장</strong> gitid{" "}
                    </p>
                    <p>
                        <a href="#">mockcote.com...</a>
                    </p>
                </InfoDiv>

                <InfoHr />

                <InfoDiv>
                    <h2>스터디 설명</h2>
                    <p>더미데이터 더미데이터 더미데이터 더미데이터 더미데이터 더미데이터</p>
                </InfoDiv>

                <InfoHr />

                <InfoDiv>
                    <h2>스터디 멤버</h2>
                    <ul>
                        {/* {studyMembers.map((member) => (
            							<li key={member.id}>
              							{member.name} ({member.role})
            							</li>
          							))} */}

                        <li>member1</li>
                        <li>member1</li>
                        <li>member1</li>
                        <li>member1</li>
                        <li>member1</li>
                    </ul>
                </InfoDiv>
            </StudyInfoDiv>
        </>
    );
}

const StudyInfoDiv = styled.div`
    margin: 0px;
    width: 270px;
    height: 100vh;
    background-color: #637381;
    padding: 15px 15px;
`;

const InfoDiv = styled.div`
    box-sizing: border-box;
    padding: 10px 15px;
    width: 270px;
    border-radius: 10px;
    background-color: white;
`;

const InfoHr = styled.hr`
    width: 270px;
    background-color: white;
`;

export default StudyInfo;
