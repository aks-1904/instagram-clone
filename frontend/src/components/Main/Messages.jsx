import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Messages = ({ chatUser }) => {
  return (
    <div className="overflow-y-auto py-3">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar className={"h-28 w-28"}>
            <AvatarImage src={chatUser?.profilePicture} />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <span className="font-bold text-lg">{chatUser?.username}</span>
          <Link to={`/profile/${chatUser?._id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((message, idx) => (
          <div className="" key={idx}>
            <div>{message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
