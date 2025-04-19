import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessages from "../../hooks/useGetAllMessages";
import useGetRealTimeMessages from "../../hooks/useGetRealTimeMessages";

const Messages = ({ chatUser }) => {
  useGetRealTimeMessages();
  useGetAllMessages();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

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
        {messages?.map((message) => (
          <div
            key={message?._id}
            className={`flex ${
              message?.senderId === user?._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`py-2 rounded-lg max-w-xs break-words px-5 ${
                message?.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {message?.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
