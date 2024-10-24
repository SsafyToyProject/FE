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
  const [studiesInfo, setStudiesInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const sessionStorage = window.sessionStorage;
        const userId = sessionStorage.getItem("userId");

        // 사용자의 스터디 id 목록 가져오기
        const userResponse = await axios.get(`/study/user/${userId}`);
        const studyIds = userResponse.data.studies.map((study) => study.study_id);

        // 각 스터디의 상세 정보 가져오기 (Promise.all을 사용하여 모든 요청을 병렬 처리)
        const studyInfoResponses = await Promise.all(studyIds.map((studyId) => axios.get(`/study/${studyId}`)));

        // 각 스터디 정보를 상태로 저장
        const studies = studyInfoResponses.map((response) => ({
          code: response.data.code,
          owner_id: response.data.owner_id,
          study_id: response.data.study_id,
          name: response.data.name,
          description: response.data.description,
          study_member: response.data.study_member,
          study_memeber_cnt: response.data.study_memeber_cnt,
        }));

        setStudiesInfo(studies);
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 에러 발생:", error);
        if (!error.response) {
          alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    };

    fetchStudies();
  }, []);

  return (
    <div>
      <Nav />
      <PageContainer>
        <Title>스터디 목록</Title>
        {studiesInfo.length === 0 ? (
          <Title>가입한 스터디가 없습니다</Title>
        ) : (
          studiesInfo.map((study) => (
            <StudyCard key={study.study_id}>
              <StudyTitle>{study.name}</StudyTitle>
              <StudyDescription>
                {/* study 설명이 20자가 넘어가면 생략 */}
                {study.description.length > 20 ? study.description.slice(0, 20) + "..." : study.description}
              </StudyDescription>
              {/* study 정보 prop으로 넘겨주기 */}
              <Button onClick={() => navigate(`/study/${study.study_id}`, { state: study })}>입장하기</Button>
            </StudyCard>
          ))
        )}
      </PageContainer>
    </div>
  );
}

export default StudyList;
