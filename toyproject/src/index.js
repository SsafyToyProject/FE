import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Live from "./pages/Live";
import Study from "./pages/Study";
import CreateStudy from "./components/studymain/CreateStudy";

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
        path: "/study",
        element: <Study />,
    },
    {
        path: "/create-study",
        element: <CreateStudy />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
