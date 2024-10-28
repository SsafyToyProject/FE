import { Link, useNavigate, useParams } from "react-router-dom";
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
import Nav from "../common/Nav";

function Signup() {
  const idInput = useInput();
  const passwordInput = useInput();
  const passwordCheckInput = useInput();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 빈 칸이 있다면
    if (!idInput.value || !passwordInput.value || !passwordCheckInput.value) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    // 비밀번호 확인과 맞지 않다면
    if (passwordInput.value !== passwordCheckInput.value) {
      alert("비밀번호를 다시 확인하세요.");
      return;
    }

    // 회원가입 POST 요청 (파라미터: handle, password, level)
    try {
      const response = await axios.post("/api/user/signup", {
        handle: idInput.value,
        password: passwordInput.value,
        level: 1,
      });

      alert("회원가입 성공!");
      navigate(`/login/${params.code}`);
    } catch (error) {
      console.log("오류", error);
      // 상태 코드가 409이면 이미 사용중인 아이디
      if (error.response.status === 409) {
        alert("이미 사용중인 아이디입니다");
      }
      // 회원가입 실패
      else {
        alert("회원가입 실패!");
      }
    }
  };

  return (
    <>
      <Nav />
      <Container>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <Title>회원가입</Title>
            <FormGroup>
              <Label htmlFor="id">아이디</Label>
              <Label style={{ color: "red" }}>(반드시 백준아이디를 입력하시오)</Label>
              <Input type="text" id="id" {...idInput} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">비밀번호</Label>
              <Input type="password" id="password" {...passwordInput} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">비밀번호 확인</Label>
              <Input type="password" id="password_check" {...passwordCheckInput} />
            </FormGroup>
            <ButtonGroup>
              <Button type="button" onClick={() => navigate(-1)}>
                뒤로가기
              </Button>
              <Button type="submit">회원가입</Button>
            </ButtonGroup>
          </form>
          <LinkGroup>
            <Link to={`/login/${params.code}`}>로그인하기</Link>
          </LinkGroup>
        </FormWrapper>
      </Container>
    </>
  );
}

export default Signup;
