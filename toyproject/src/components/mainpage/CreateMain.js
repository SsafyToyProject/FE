import Nav from "../common/Nav";
import {
  BlueBar,
  Container,
  Content,
  MainTitle,
  PageContainer,
  Section,
  SectionDescription,
  SectionTitle,
} from "../../styles/main_styles/CreateMainStyles";

function ProgramMainPage() {
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
        <MainTitle>MockCote</MainTitle>
        {sections.map((section, index) => (
          <Container key={index}>
            <BlueBar />
            <Section>
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
}

export default ProgramMainPage;
