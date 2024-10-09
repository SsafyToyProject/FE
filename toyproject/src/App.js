import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>App</h1>
      <Link to="/live">live</Link>
      <br />
      <Link to="/main">main</Link>
      <br />
      <Link to="/list">StudyList</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default App;
