import React from "react";
import Posts from "./Posts";
import RightSideBar from "./RightSideBar";
import useGetAllPosts from "../../hooks/useGetAllPosts";

const Home = () => {
  useGetAllPosts();

  return (
    <div className="flex justify-center ml-[20vw]">
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
