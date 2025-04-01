import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Main/SideBar";

const Main = () => {
  return (
    <div className="flex w-screen min-h-screen">
      <div className="border-r-2 border-gray-300">
        <SideBar />
      </div>
      <div className="flex-1 px-5 py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
