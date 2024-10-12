import {
  PageContainer,
  Title,
  StudyCard,
  StudyTitle,
  StudyDescription,
  Button,
  RightAlignedLabel,
} from "../../../styles/studylist_styles/CreateStudyListStyles";
import Nav from "../../common/Nav";

function StudyList() {
  const studies = [
    { id: 1, title: "스터디 1", description: "스터디 설명 1...", isLive: 1 },
    { id: 2, title: "스터디 2", description: "스터디 설명 2...", isLive: 0 },
    { id: 3, title: "스터디 3", description: "스터디 설명 3...", isLive: 0 },
  ];

  studies.sort((o1, o2) => o2.isLive - o1.isLive);

  return (
    <div>
      <Nav />
      <PageContainer>
        <Title>스터디 목록</Title>
        {studies.map((study) => (
          <StudyCard key={study.id}>
            {study.isLive ? <RightAlignedLabel $primary>라이브 코딩 진행중</RightAlignedLabel> : null}
            <StudyTitle>{study.title}</StudyTitle>
            <StudyDescription>{study.description}</StudyDescription>
            <Button>입장하기</Button>
          </StudyCard>
        ))}
      </PageContainer>
    </div>
  );
}

export default StudyList;
