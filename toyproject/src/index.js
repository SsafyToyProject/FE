import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Live from "./pages/Live";
import GlobalStyle from "./styles/GlobalStyle";
import CreateLive from "./components/live/CreateLive";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
);
