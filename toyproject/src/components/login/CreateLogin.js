import styled from "styled-components";

function Login() {
  return (
    <div>
      <form action="/list">
        <p htmlFor="id">아이디</p>
        <input id="id" placeholder="아이디를 입력하세요" />
        <br />
        <p htmlFor="pwd">비밀번호</p>
        <input id="pwd" placeholder="비밀번호를 입력하세요" />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
