import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  padding: 10px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 헤더 컴포넌트
function Nav() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const login = () => {
    setUserInfo((current) => ["123", ...current]);
    navigate("/list");
  };
  const logout = () => {
    // main화면으로 이동
    setUserInfo(() => []);
    navigate("/main");
  };
  return (
    <Header>
      <button onClick={() => navigate("/list")}>ToyProject</button>
      {/* 사용자 정보가 없으면 */}
      {userInfo.length === 0 ? (
        <span>
          <button onClick={login}>로그인</button>
          <button>회원가입</button>
        </span>
      ) : (
        // 사용자 정보가 있으면
        <span>
          <button onClick={logout}>로그아웃</button>
          <button>스터디 만들기</button>
        </span>
      )}
    </Header>
  );
}

export default Nav;
