import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/useInput";

// 스타일 정의
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2c3d99;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 8px;
`;

const Title = styled.h1`
  margin-top: 0;
  text-align: center;
`;

function Signup() {
  const idInput = useInput();
  const passwordInput = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 아래에 작성하기
    // 간단한 유효성 검사
    if (!idInput.value || !passwordInput.value) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 임시 사용자 정보 사용
    const dummyUser = {
      id: "test",
      password: "1234",
      name: "홍길동",
    };

    // 아이디가 겹치지 않는다면
    if (idInput.value !== dummyUser.id) {
      // 회원가입 성공
      alert("회원가입 성공!");
      navigate("/login");
    } else {
      // 회원가입 실패
      alert("이미 사용중인 아이디입니다.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Title>회원가입</Title>
          <FormGroup>
            <Label htmlFor="id">아이디</Label>
            <Input type="text" id="id" {...idInput} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input type="password" id="password" {...passwordInput} />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>
            <Button type="submit">회원가입</Button>
          </ButtonGroup>
        </form>
        <LinkGroup>
          <Link to="/login">로그인하기</Link>
        </LinkGroup>
      </FormWrapper>
    </Container>
  );
}

export default Signup;
