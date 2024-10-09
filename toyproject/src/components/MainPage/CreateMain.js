import React from "react";
import styled from "styled-components";
import Nav from "../common/Nav";

const Container = styled.div`
  display: flex;
  max-width: 800px;
  height: 100px;
  margin: 0 auto;
  padding: 20px;
`;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const MainTitle = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
`;

const BlueBar = styled.div`
  width: 4px;
  height: 100%;
  background-color: #4285f4;
  margin-right: 16px;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

const SectionDescription = styled.p`
  color: #666;
  font-size: 14px;
`;

const ProgramMainPage = () => {
  const sections = [
    {
      title: "어떤 프로그램인가요?",
      description: "프로그램 설명....",
    },
    {
      title: "사용하는 방법",
      description: "사용 방법 설명...",
    },
    {
      title: "사용할 대상",
      description: "사용할 대상 설명...",
    },
    {
      title: "만든이들",
      description: "프로그램 만든사람...",
    },
  ];

  return (
    <div>
      <Nav />
      <PageContainer>
        <MainTitle>프로그램 이름</MainTitle>
        {sections.map((section, index) => (
          <Container key={index}>
            <BlueBar />
            <Section onClick={() => console.log(`Clicked ${section.title}`)}>
              <Content>
                <SectionTitle>{section.title}</SectionTitle>
                <SectionDescription>{section.description}</SectionDescription>
              </Content>
            </Section>
          </Container>
        ))}
      </PageContainer>
    </div>
  );
};

export default ProgramMainPage;
