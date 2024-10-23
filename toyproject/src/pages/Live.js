import { createContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const queryToggle = createContext();

function Live() {
  const [qtoggle, setQtoggle] = useState(false);

  return (
    <div>
      <queryToggle.Provider value={{ qtoggle, setQtoggle }}>
        <Outlet />
      </queryToggle.Provider>
    </div>
  );
}

export default Live;
