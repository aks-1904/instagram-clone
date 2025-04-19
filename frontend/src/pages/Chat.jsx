import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { setChatUser } from "../redux/authSlice";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "../components/Main/Messages";
import axios from "axios";
import { setMessages } from "../redux/chatSlice.js";

const Chat = () => {
  const { user, suggestedUsers, chatUser, onlineUsers } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const { messages } = useSelector((store) => store.chat);

  const messageSendHandler = async (e) => {
    e.preventDefault();

    try {
      if (message.trim()) {
        const res = await axios.post(
          `http://localhost:8080/message/send/${chatUser?._id}`,
          { message },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setMessages([...messages, res.data.message]));
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setChatUser(null));
    };
  }, []);

  return (
    <div className="ml-[20vw] flex h-full">
      <section className="w-fit pr-8">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <div className="h-[1px] w-full bg-gray-200 mb-4"></div>
        <div className="overflow-y-auto h-[80vh] flex flex-col gap-5">
          {suggestedUsers.map((user) => {
            const isOnline = onlineUsers.includes(user?._id);
            return (
              <div
                onClick={() => dispatch(setChatUser(user))}
                key={user?._id}
                className="flex items-center gap-3 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer transition-colors duration-200"
              >
                <Avatar className={"h-16 w-16"}>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.username}</span>
                  <span
                    className={`text-sm font-bold ${
                      isOnline ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {chatUser ? (
        <section className="flex-1 border-l border-gray-200 flex flex-col w-full px-3">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-200 sticky top-0 bg-white">
            <Avatar>
              <AvatarImage src={chatUser?.profilePicture} />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{chatUser?.username}</span>
            </div>
          </div>
          <div className="flex-1">
            <Messages chatUser={chatUser} />
          </div>
          <div>
            <form className="flex gap-5" onSubmit={messageSendHandler}>
              <Input
                type={"text"}
                placeholder={"Type a message..."}
                value={message}
                className={"focus-visible:ring-transparent"}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type={"submit"}>Send</Button>
            </form>
          </div>
        </section>
      ) : (
        <section className="flex items-center justify-center flex-col mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1>You messages</h1>
          <span>Start a chat</span>
        </section>
      )}
    </div>
  );
};

export default Chat;
