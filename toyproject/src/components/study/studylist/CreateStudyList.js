import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  // user가 가입한 스터디 목록 정보 배열
  const [studiesInfo, setStudiesInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const sessionStorage = window.sessionStorage;
        const userId = sessionStorage.getItem("userId");

        // 사용자의 스터디 id 목록 가져오기
        const userResponse = await axios.get("http://localhost:4000/study", {
          params: { user_id: userId },
        });

        const studyIds = userResponse.data.user.studies.map((study) => study.study_id);

        // 각 스터디의 상세 정보와 라이브 상태를 병렬로 가져오기
        const studiesData = await Promise.all(
          studyIds.map(async (studyId) => {
            const [studyInfoResponse, liveResponse] = await Promise.all([
              // 스터디 정보 상세 조회 (원래는 /study/{study_id} 로 가져와야 함)
              axios.get("http://localhost:4000/studyInfo", { params: { study_id: studyId } }),
              // 스터디의 모든 세션 조회 (원래는 /session/study/{study_id} 로 가져와야 함)
              axios.get("http://localhost:4000/session", { params: { study_id: studyId } }),
            ]);

            return {
              id: studyInfoResponse.data.study_id,
              name: studyInfoResponse.data.name,
              description: studyInfoResponse.data.description,
              // 원래는 현재시간이 세션 시작시간과 종료시간 사이인지 확인해서 넣어줄 것
              isLive: liveResponse.data.study.num_elements,
            };
          })
        );

        // 라이브 중인 스터디를 먼저 정렬
        studiesData.sort((a, b) => b.isLive - a.isLive);
        setStudiesInfo(studiesData);
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 에러 발생:", error);
      }
    };

    fetchStudies();
  }, []);

  return (
    <div>
      <Nav />
      <PageContainer>
        <Title>스터디 목록</Title>
        {studiesInfo.map((study) => (
          <StudyCard key={study.id}>
            {study.isLive > 0 && <RightAlignedLabel $primary>라이브 코딩 진행중</RightAlignedLabel>}
            <StudyTitle>{study.name}</StudyTitle>
            <StudyDescription>{study.description}</StudyDescription>
            {/* study정보 prop으로 넘겨주기 */}
            <Button onClick={() => navigate(`/study/${study.id}`, { state: study })}>입장하기</Button>
          </StudyCard>
        ))}
      </PageContainer>
    </div>
  );
}

export default StudyList;
