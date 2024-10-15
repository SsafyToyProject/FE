import { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../common/Input";
import axios from "axios";
import { useLocation } from "react-router-dom";
// 기본적으로 사용하는 api 호출 함수가 fetch랑 axios가 있는데
// 이유는 까먹었고 그치만 axios가 기능적응로 더 좋은 걸로 알고 있음
// axios api 연동 검색해보기

function StudyInfo() {
  // 구조 분해 할당
  //const [studyInfo, SetStudyInfo] = useState({});
  // studyInfo: response 값을 넣을 변수
  // 초기 studyInfo: {} <- useState 인자값

  // SetStudyInfo: studyInfo의 상태를 변경하는 함수
  // SetStudyInfo({study_id: 1}); -> studyInfo: {study_id: 1}

  const location = useLocation();

  const studyInfo = location.state;
  console.log(studyInfo);

  // useEffect(() => {
  //   // api 호출
  //   // const res = await axios.get(`http://localhost:8000/study/${studyID}`);
  //   // 나중에 여기서 라우팅되어 넘어오는 스터디 아이디를 가져올 수 있거든 usePath 뭐시기 제공하는 걸 써서 api 호출할 때 넣는 것이다

  //   // 더미데이터
  //   const response = {
  //     study_id: 1,
  //     owner_id: 1,
  //     name: "코테 스터디",
  //     description: "화수 9시-11시 진행",
  //     code: "adsf9sgsdg8",
  //     study_member_cnt: 2,
  //     study_member: [
  //       {
  //         user_id: 8,
  //         github_id: "Kimyebin00",
  //       },
  //       {
  //         user_id: 9,
  //         github_id: "ejoyee",
  //       },
  //     ],
  //   };
  //   // 콘솔에 찍어서 호출 잘 동작하는지 확인하기
  //   // SetStudyInfo(res.data); // 이런 식으로 response를 studyInfo에 넣어주기
  //   console.log(response);
  //   SetStudyInfo(response);
  // }, []); // 빈배열이면 초기 렌더링할 때 useEff- 내부의 코드를 실행하는 것
  // // 배열 안에 있는 값에 변화가 생길 때마다 useEff-이 동작하는 건데 빈 배열일 때는 초기 렌더링할 때 동작하는 것 <<

  return (
    <>
      <StudyInfoDiv>
        <InfoDiv>
          <h2>{studyInfo?.name}</h2>
          {/* 물음표 한 이유는 없을 때 돌리려고 하면 오류가 날 수 있기 때문에 ?. 이거는 값이 있을 때 값을 들여온다 << 불러오는 시간차로 인한 오류를 해결하기 위해서*/}
          <p>
            <strong>방장</strong> github_id
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
          <ul>
            {studyInfo?.study_member?.map((member) => (
              <li key={member.user_id}>{member.github_id}</li>
            ))}
          </ul>
        </InfoDiv>
      </StudyInfoDiv>
    </>
  );
}

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
