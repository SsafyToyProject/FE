import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Live from "./pages/Live";
import Study from "./pages/Study";
import CreateStudy from "./components/studymain/CreateStudy";
import GlobalStyle from "./styles/GlobalStyle";
import CreateLive from "./components/live/create/CreateLive";
import Main from "./pages/Main";
import List from "./pages/List";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Session from "./pages/Session";
import SessionWait from "./components/live/session/SessionWait";
import SessionProgress from "./components/live/session/SessionProgress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/live",
    element: <Live />,
    children: [
      {
        path: "session",
        element: <CreateLive />,
      },
    ],
  },
  {
    path: "/study",
    element: <Study />,
  },
  {
    path: "/create-study",
    element: <CreateStudy />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/session/:session_id/:user_id",
    element: <Session />,
    children: [
      {
        path: "wait",
        element: <SessionWait />,
      },
      {
        path: "progress",
        element: <SessionProgress />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
);
