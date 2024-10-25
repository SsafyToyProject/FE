import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import StudyBody from "../components/Study/studymain/StudyBody";
import StudyInfo from "../components/Study/studymain/StudyInfo";
import Navbar from "../components/common/Nav";

import styled from "styled-components";

function Study() {
  const { study_id } = useParams(); // URL에서 스터디 ID 추출
  const [studyInfo, setStudyInfo] = useState(null); // 스터디 정보를 저장할 상태

  // 스터디 정보 가져오기
  useEffect(() => {
    const fetchStudyInfo = async () => {
      try {
        console.log("study_id 출력 : " + study_id);
        const res = await axios.get(`/api/study/${study_id}`);
        setStudyInfo(res.data);
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 에러 발생: ", error);
      }
    };

    fetchStudyInfo();
  }, []);

  return (
    <>
      <Navbar />
      <StudyPageDiv>
        <StudyInfo studyInfo={studyInfo} />
        <StudyBody studyInfo={studyInfo} />
      </StudyPageDiv>
    </>
  );
}

const StudyPageDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default Study;
