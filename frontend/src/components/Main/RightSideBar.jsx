import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSideBar = () => {
  const { user, suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="w-[20vw] my-10 pr-32">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col ml-2">
          <h1 className="text-sm font-bold">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-xs text-gray-600">{user?.bio || "Bio"}</span>
        </div>
      </div>

      <div className="my-10">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">Suggested For Your</h1>
          <span className="font-medium cursor-pointer text-blue-600 underline text-sm">
            See All
          </span>
        </div>
      </div>
      {suggestedUsers?.map((data) => (
        <div key={data?._id} className="my-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${data?._id}`}>
              <Avatar>
                <AvatarImage src={data?.profilePicture} alt="img" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col ml-2">
              <h1 className="text-sm font-bold">
                <Link to={`/profile/${data?._id}`}>{data?.username}</Link>
              </h1>
              <span className="text-xs text-gray-600">
                {data?.bio || "Bio"}
              </span>
            </div>
          </div>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 cursor-pointer transition-colors duration-150">Follow</span>
        </div>
      ))}
    </div>
  );
};

export default RightSideBar;
