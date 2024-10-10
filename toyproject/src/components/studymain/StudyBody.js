import { useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";

import styled from "styled-components";

function StudyBody() {
    const { value, onChange } = useInput();

    return (
        <StudyBodyDiv>
            {/* 진행 중인 라이브 세션 상단 */}
            <Section>
                <SectionHeader>
                    <h2>진행 중인 라이브</h2>
                    <Button>라이브 만들기</Button> {/* 고민 중인 부분 : 라이브 만들기 버튼 위치*/}
                </SectionHeader>

                <LiveSessionCard>
                    <strong>라이브세션제목</strong>
                    <p>
                        {/* 고민 중인 부분 : 라이브명에 대한 이야기... */}
                        <strong>시작 : </strong>2024.10.03 21:00
                    </p>
                    <p>
                        <strong>종료: </strong>2024.10.03 22:30
                    </p>
                    <ButtonGroup>
                        <ActionButton primary>참가</ActionButton>
                        <ActionButton>불참</ActionButton>
                        <ActionButton primary>입장하기</ActionButton>
                    </ButtonGroup>
                </LiveSessionCard>
            </Section>

            <Hr />

            {/* 바디 하단 히스토리 */}
            <Section>
                <h2>히스토리</h2>
                <HistoryGrid>
                    <HistoryCard>2024.10.03</HistoryCard>
                    <HistoryCard>2024.10.02</HistoryCard>
                    <HistoryCard>2024.10.01</HistoryCard>
                </HistoryGrid>
            </Section>
        </StudyBodyDiv>
    );
}

const StudyBodyDiv = styled.div`
    flex: 1;
    padding: 20px;
    padding-right: 120px;
    background-color: white;
`;

const Section = styled.div`
    margin-bottom: 20px;
    min-width: 300px;
`;

const SectionHeader = styled.div`
    display: flex;
    margin: 0px 10px 0px 0px;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.button`
    height: fit-content;
    padding: 10px 15px;
    margin: 10px 10px;

    background-color: #637381;
    border: none;
    border-radius: 5px;

    color: white;
    font-size: medium;

    cursor: pointer;
`;

const LiveSessionCard = styled.div`
    width: fit-content;
    background-color: #e0e7ff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const ActionButton = styled.button`
    background-color: ${(props) => (props.primary ? "#3b82f6" : "#e11d48")};
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
`;

const Hr = styled.hr`
    margin: 20px 10px 20px 0px;
    background-color: gray;
    height: 0.5;
`;

const HistoryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    /* padding: 10px 10px; */
`;

const HistoryCard = styled.div`
    width: fit-content;
    background-color: #e0e7ff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;

export default StudyBody;
