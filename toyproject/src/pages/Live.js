import { createContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const queryToggle = createContext();

function Live() {
  const [qtoggle, setQtoggle] = useState(false);

  return (
    <div>
      <h1>Live Session</h1>
      <Link to="session">세션 생성하기</Link>
      <queryToggle.Provider value={{ qtoggle, setQtoggle }}>
        <Outlet />
      </queryToggle.Provider>
    </div>
  );
}

export default Live;
