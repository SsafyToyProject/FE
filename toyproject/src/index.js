import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Live from "./pages/Live";
import Main from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/live",
    element: <Live />,
  },
  {
    path: "/main",
    element: <Main />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
