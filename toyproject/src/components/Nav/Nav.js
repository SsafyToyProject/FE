import { useState } from "react";
// 헤더 컴포넌트
function Nav() {
  const [userInfo, setUserInfo] = useState([]);
  return (
    <header>
      <button>ToyProject</button>
      {/* 사용자 정보가 없으면 */}
      {userInfo.length === 0 ? (
        <span>
          <button>로그인</button>
          <button>회원가입</button>
        </span>
      ) : (
        // 사용자 정보가 있으면
        <span>
          <button>로그아웃</button>
          <button>스터디 만들기</button>
        </span>
      )}
    </header>
  );
}

export default Nav;
