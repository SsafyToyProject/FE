import React from "react";
import styled from "styled-components";
import Nav from "../common/Nav";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StudyCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StudyTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const StudyDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Label = styled.label`
  background-color: #4285f4;
  color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
`;

const RightAlignedLabel = styled(Label)`
  float: right;
`;

const StudyList = () => {
  const studies = [
    { id: 1, title: "스터디 1", description: "스터디 설명 1..." },
    { id: 2, title: "스터디 2", description: "스터디 설명 2..." },
    { id: 3, title: "스터디 3", description: "스터디 설명 3..." },
  ];

  return (
    <div>
      <Nav />
      <PageContainer>
        <Title>스터디 목록</Title>
        {studies.map((study) => (
          <StudyCard key={study.id}>
            <RightAlignedLabel $primary>라이브 코딩 진행중</RightAlignedLabel>
            <StudyTitle>{study.title}</StudyTitle>
            <StudyDescription>{study.description}</StudyDescription>
            <Button>입장하기</Button>
          </StudyCard>
        ))}
      </PageContainer>
    </div>
  );
};

export default StudyList;
