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
} from "../../../styles/studylist_styles/CreateStudyListStyles";
import Nav from "../../common/Nav";

function StudyList() {
  // user가 가입한 스터디 목록 정보 배열
  const [studiesInfo, setStudiesInfo] = useState([]);
  const navigate = useNavigate();

  // 로딩할 때
  useEffect(() => {
    // 스터디 정보 요청
    const fetchStudies = async () => {
      try {
        const sessionStorage = window.sessionStorage;
        const userId = sessionStorage.getItem("userId");

        // 사용자의 스터디 id 목록 가져오기
        const userResponse = await axios.get(`/study/user/${userId}`);
        const studyIds = userResponse.data.studies.map((study) => study.study_id);

        // 현재 스터디 정보 초기화
        setStudiesInfo([]);

        // 각 스터디의 상세 정보 가져오기
        studyIds.map(async (studyId) => {
          const studyInfoResponse = await axios.get(`/study/${studyId}`);
          setStudiesInfo((current) => [
            ...current,
            {
              code: studyInfoResponse.data.code,
              owner_id: studyInfoResponse.data.owner_id,
              study_id: studyInfoResponse.data.study_id,
              name: studyInfoResponse.data.name,
              description: studyInfoResponse.data.description,
              study_member: studyInfoResponse.data.study_member,
              study_memeber_cnt: studyInfoResponse.data.study_memeber_cnt,
            },
          ]);
        });
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
        {studiesInfo == null ? (
          <Title>가입한 스터디가 없습니다</Title>
        ) : (
          studiesInfo.map((study) => (
            <StudyCard key={study.study_id}>
              <StudyTitle>{study.name}</StudyTitle>
              <StudyDescription>
                {/* study 설명이 20자가 넘어가면 생략... */}
                {study.description.length > 20 ? study.description.slice(0, 20) + "..." : study.description}
              </StudyDescription>
              {/* study정보 prop으로 넘겨주기 */}
              <Button onClick={() => navigate(`/study/${study.id}`, { state: study })}>입장하기</Button>
            </StudyCard>
          ))
        )}
      </PageContainer>
    </div>
  );
}

export default StudyList;
