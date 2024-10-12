import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  Button,
  LinkGroup,
  ButtonGroup,
  Title,
} from "../../styles/login_styles/CreateLoginStyles";
import useInput from "../../hooks/useInput";

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
      navigate("/study-list");
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
