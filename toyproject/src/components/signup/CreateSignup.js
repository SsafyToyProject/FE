import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 간단한 유효성 검사
    if (!idInput.value || !passwordInput.value) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 회원가입 POST 요청 (파라미터: handle, password, level) (임시로 GET요청)
    try {
      const response = await axios.get("http://localhost:4000/signup", {
        handle: idInput.value,
        password: passwordInput.value,
      });

      // 상태 코드가 200이면 회원가입 성공 (원래는 response.headers.status로 확인)
      const statusCode = response.status;
      if (statusCode === 200) {
        alert("회원가입 성공!");
        navigate("/login");
      }
      // 상태 코드가 401이면 이미 사용중인 아이디
      else if (statusCode === 401) {
        alert("이미 사용중인 아이디입니다");
      }
      // 회원가입 실패
      else {
        alert("회원가입 실패!");
      }
    } catch (error) {
      console.log("오류", error);
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
