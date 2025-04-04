import React from "react";
import Posts from "./Posts";
import RightSideBar from "./RightSideBar";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Posts />
      </div>
      <div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
