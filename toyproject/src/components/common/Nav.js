import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  box-sizing: border-box;
  width: 100%;
  background-color: #0d1117;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.button`
  font-size: 24px;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  background-color: #2563eb;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavButton = styled.button`
  background-color: ${(props) => (props.color === "primary" ? "#2563eb" : "gray")};
  color: ${(props) => (props.color === "primary" ? "white" : "white")};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.color === "primary" ? "#1e40af" : "#6b7280")};
  }
`;

const UserInfo = styled.span`
  color: white;
  margin-right: 15px;
`;

function Navbar() {
  const navigate = useNavigate();
  // 세션 스토리지 정보
  const sessionStorage = window.sessionStorage;
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userName = sessionStorage.getItem("userName");

  // 로그아웃 이벤트
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <NavbarContainer>
      {/* 로고 클릭시 로그인 중이라면 스터디 목록으로 */}
      <Link to={isLoggedIn ? "/study-list" : "/"}>
        <Logo>MockCote</Logo>
      </Link>
      <NavLinks>
        {isLoggedIn ? (
          // 로그인 중이라면
          <>
            <UserInfo>{userName}님 환영합니다!</UserInfo>
            <Link to="/create-study">
              <NavButton color="primary">스터디 만들기</NavButton>
            </Link>
            <NavButton onClick={handleLogout}>로그아웃</NavButton>
          </>
        ) : (
          // 로그인 정보가 없으면
          <>
            <Link to="/login/0">
              <NavButton>로그인</NavButton>
            </Link>
            <Link to="/signup/0">
              <NavButton color="primary">회원가입</NavButton>
            </Link>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
