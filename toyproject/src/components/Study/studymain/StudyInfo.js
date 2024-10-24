import { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../../common/Input";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
// 기본적으로 사용하는 api 호출 함수가 fetch랑 axios가 있는데
// 이유는 까먹었고 그치만 axios가 기능적응로 더 좋은 걸로 알고 있음
// axios api 연동 검색해보기

function StudyInfo({ studyInfo }) {
  // 구조 분해 할당
  // const location = useLocation();
  // const studyInfo = location.state;
  // console.log(studyInfo);

  return (
    <>
      <StudyInfoDiv>
        <InfoDiv>
          <h2>{studyInfo?.name}</h2>
          {/* 물음표 한 이유는 없을 때 돌리려고 하면 오류가 날 수 있기 때문에 ?. 이거는 값이 있을 때 값을 들여온다 << 불러오는 시간차로 인한 오류를 해결하기 위해서*/}
          <p>
            <strong>방장</strong> {studyInfo?.owner_handle}
          </p>
          <p>
            <a href="#">mockcote.com/{studyInfo?.code}</a>
          </p>
        </InfoDiv>

        <InfoHr />

        <InfoDiv>
          <h2>스터디 설명</h2>
          <p>{studyInfo?.description}</p>
        </InfoDiv>

        <InfoHr />

        <InfoDiv>
          <h2>스터디 멤버</h2>
          <StyledUl>
            {studyInfo?.study_member?.map((member) => (
              <li key={member.user_id}>{member.handle}</li>
            ))}
          </StyledUl>
        </InfoDiv>
      </StudyInfoDiv>
    </>
  );
}

const StyledUl = styled.ul`
  list-style: none; /* 기본 리스트 스타일 제거 */
  padding-left: 0; /* 기본 패딩 제거 */
  margin: 0; /* 기본 마진 제거 */
`;

const StudyInfoDiv = styled.div`
  width: 300px;
  height: 100%;
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
  border: none;
  width: 270px;
  background-color: white;
  border-top: 1px solid white;
  margin: 12px 0;
`;

export default StudyInfo;
