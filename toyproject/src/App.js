import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>App</h1>
            <Link to="/live">live</Link>
            <br></br>
            <Link to="/study">study</Link>
            <br></br>
            <Link to="/create-study">create-study</Link>
        </div>
    );
}

export default App;
