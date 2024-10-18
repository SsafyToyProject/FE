import { Link } from "react-router-dom";

function App() {
  const user_id = "user1";
  const session_id = "1";
  const code = "0";

  return (
    <div>
      <h1>App</h1>
      <Link to="/live">live</Link>
      <br />
      <Link to="/session-wait">SessionWait</Link>
      <br />
      <Link to="/main">main</Link>
      <br />
      <Link to="/study-list">StudyList</Link>
      <br />
      <Link to={`/login/${code}`}>Login</Link>
      <br />
      <Link to={`/signup/${code}`}>Signup</Link>
      <br />
      <Link to="/study/0">study</Link>
      <br />
      <Link to="/create-study">create-study</Link>
      <br />
      <Link to={`/session/${session_id}/${user_id}`}>세션의 모든것...</Link>
      <br />
      <Link to={`/study-invite/3fe5c84e37ccfd11`}>초대 화면</Link>
    </div>
  );
}

export default App;
