import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Live from "./pages/Live";
import Study from "./pages/Study";
import CreateStudy from "./components/studymain/CreateStudy";
import GlobalStyle from "./styles/GlobalStyle";
import CreateLive from "./components/live/CreateLive";
import Main from "./pages/Main";
import StudyList from "./pages/StudyList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SessionWait from "./pages/SessionWait";

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
    path: "/study/:study_id",
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
    path: "/study-list",
    element: <StudyList />,
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
    path: "/session-wait",
    element: <SessionWait />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
);
