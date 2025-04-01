import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Home from "./components/Main/Home";
import Chat from "./components/Main/Chat";
import Logout from "./components/Main/Logout";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/logout",
        element: <Logout />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

const App = () => {
  return <RouterProvider router={BrowserRouter} />;
};

export default App;
