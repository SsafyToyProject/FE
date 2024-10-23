import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Live from "./pages/Live";
import Study from "./pages/Study";
import CreateStudy from "./components/Study/CreateStudy";
import GlobalStyle from "./styles/GlobalStyle";
import CreateLive from "./components/live/create/CreateLive";
import Main from "./pages/Main";
import StudyList from "./pages/StudyList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Session from "./pages/Session";
import StudyInvite from "./pages/StudyInvite";
import SessionWait from "./components/live/session/SessionWait";
import SessionProgress from "./components/live/session/SessionProgress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/live",
    element: <Live />,
    children: [
      {
        path: "session/:study_id",
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
    path: "/study-list",
    element: <StudyList />,
  },
  {
    path: "/study-invite/:code",
    element: <StudyInvite />,
  },
  {
    path: "/login/:code",
    element: <Login />,
  },
  {
    path: "/signup/:code",
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
