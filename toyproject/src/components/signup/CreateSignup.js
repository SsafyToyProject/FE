import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import {
  Button,
  ButtonGroup,
  Container,
  FormGroup,
  FormWrapper,
  Input,
  Label,
  LinkGroup,
  Title,
} from "../../styles/signup_styles/CreateSignupStyles";

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
