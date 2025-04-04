import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <div className="flex items-center flex-col gap-20">
      {[1, 2, 3, 4].map((_, idx) => (
        <Post key={idx} />
      ))}
    </div>
  );
};

export default Posts;
