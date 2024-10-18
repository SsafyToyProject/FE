import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  AcceptButton,
  ButtonContainer,
  InviteContainer,
  StudyInfo,
  Title,
} from "../../../styles/studyInvite_styles/CreateStudyInviteStyles";

const InviteScreen = () => {
  const session = window.sessionStorage;
  const user_id = session.getItem("userId");
  const navigate = useNavigate();
  const params = useParams();

  // 스터디 가입 요청 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/study/signup", {
        user_id: user_id,
        study_code: params.code,
      });
      navigate("/study-list");
    } catch (error) {
      alert("가입 실패..");
    }
  };

  useEffect(() => {
    // 로그인 상태가 아니라면
    if (user_id === null) {
      alert("로그인 하세요");
      navigate(`/login/${params.code}`);
    }
  }, []);

  return (
    <InviteContainer>
      <Title>초대를 수락하시겠습니까?</Title>
      <StudyInfo>스터디 이름</StudyInfo>
      <StudyInfo>스터디 방장</StudyInfo>
      <ButtonContainer>
        <AcceptButton onClick={handleSubmit}>수락하기</AcceptButton>
      </ButtonContainer>
    </InviteContainer>
  );
};

export default InviteScreen;
