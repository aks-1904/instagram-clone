import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  return (
    <div className="flex items-center flex-col gap-20">
      {posts.map((postData) => (
        <Post key={postData?._id} data={postData} />
      ))}
    </div>
  );
};

export default Posts;
