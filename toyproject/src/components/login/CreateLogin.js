import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  const params = useParams();
  const sessionStorage = window.sessionStorage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idInput.value || !passwordInput.value) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    // 로그인 POST 요청 (파라미터: handle, password)
    try {
      const response = await axios.post("/api/user/login", {
        handle: idInput.value,
        password: passwordInput.value,
      });

      const userInfo = response.data;
      // 사용자 정보를 sessionStorage에 저장
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", userInfo.user_id);
      sessionStorage.setItem("userName", userInfo.handle);
      sessionStorage.setItem("userLevel", userInfo.level);

      // 그냥 로그인 할 때
      if (params.code === "0") {
        alert("로그인 성공!");
        navigate("/study-list");
      }
      // 초대 링크를 통해 로그인 할 때
      else {
        // 초대 링크로 다시 이동
        alert("로그인 성공, 스터디 초대 화면으로 갑니다");
        navigate(`/study-invite/${params.code}`);
      }
    } catch (error) {
      console.log("오류", error);
      // 상태 코드가 401이면 로그인 실패
      if (error.response.status === 401) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        alert("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
      }
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
            <Link to={`/signup/${params.code}`}>회원가입하기</Link>
          </LinkGroup>
        </form>
      </FormWrapper>
    </Container>
  );
}

export default Login;
