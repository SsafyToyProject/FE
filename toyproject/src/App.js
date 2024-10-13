import { Link } from "react-router-dom";

function App() {
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
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/study">study</Link>
      <br />
      <Link to="/create-study">create-study</Link>
    </div>
  );
}

export default App;
