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

function Login() {
  const idInput = useInput();
  const passwordInput = useInput();
  const navigate = useNavigate();
  const sessionStorage = window.sessionStorage;

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (idInput.value === dummyUser.id && passwordInput.value === dummyUser.password) {
      // 로그인 성공
      // 사용자 정보를 sessionStorage에 저장
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", dummyUser.id);
      sessionStorage.setItem("userName", dummyUser.name);

      alert("로그인 성공!");
      navigate("/list");
    } else {
      // 로그인 실패
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>아이디</Label>
            <Input type="text" {...idInput} />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" {...passwordInput} />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>
            <Button type="submit">로그인</Button>
          </ButtonGroup>
          <LinkGroup>
            <Link to="/signup">회원가입하기</Link>
          </LinkGroup>
        </form>
      </FormWrapper>
    </Container>
  );
}

export default Login;
