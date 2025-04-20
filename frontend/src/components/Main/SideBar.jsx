import React, { useState } from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSearchOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BiMessageSquare, BiSolidMessageSquare } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import {
  setAuthUser,
  setChatUser,
  setOnlineUsers,
  setSelectedUser,
  setSuggestedUsers,
} from "../../redux/authSlice";
import { setPosts, setSelectedPost } from "../../redux/postSlice";
import { setSocket } from "../../redux/socketSlice";
import { setMessages } from "../../redux/chatSlice";
import { setLikeNotification } from "../../redux/notificationSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { likeNotification } = useSelector((store) => store.notification);

  const SideBarData = [
    {
      deactiveIcon: <IoHomeOutline size={30} />,
      activeIcon: <IoHome size={30} />,
      text: "Home",
    },
    {
      deactiveIcon: <IoSearchOutline size={30} />,
      activeIcon: <IoSearchSharp size={30} />,
      text: "Search",
    },
    {
      deactiveIcon: <MdOutlineExplore size={30} />,
      activeIcon: <MdExplore size={30} />,
      text: "Explore",
    },
    {
      deactiveIcon: <BiMessageSquare size={30} />,
      activeIcon: <BiSolidMessageSquare size={30} />,
      text: "Chat",
    },
    {
      deactiveIcon: <FaRegHeart size={30} />,
      activeIcon: <FaHeart size={30} />,
      text: "Notifications",
    },
    {
      deactiveIcon: <CiSquarePlus size={30} />,
      activeIcon: <CiSquarePlus size={30} />,
      text: "Create",
    },
    {
      deactiveIcon: (
        <Avatar>
          <AvatarImage
            src={
              user?.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
            }
            alt="img"
          />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
      ),
      activeIcon: (
        <Avatar>
          <AvatarImage
            src={
              user?.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
            }
            alt="img"
          />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
      ),
      text: user?.username,
    },
    {
      deactiveIcon: <IoLogOutSharp size={30} />,
      activeIcon: <IoLogOutSharp size={30} />,
      text: "Logout",
    },
  ];

  const dispatch = useDispatch();
  const sideBarClickHandler = (text) => {
    if (text === "Logout") {
      dispatch(setAuthUser(null));
      dispatch(setPosts([]));
      dispatch(setSelectedPost(null));
      dispatch(setChatUser(null));
      dispatch(setOnlineUsers([]));
      dispatch(setSelectedUser(null));
      dispatch(setSuggestedUsers([]));
      dispatch(setSocket(null));
      dispatch(setMessages([]));
      dispatch(setLikeNotification([]));
      navigate("/logout", {
        replace: true,
      });
    } else if (text === "Create") setCreateDialogOpen(true);
    else if (text === user?.username) {
      navigate(`/profile/${user?._id}`);
    } else if (text === "Home") navigate("/home");
    else if (text === "Chat") navigate("/chat");
  };

  return (
    <div className="w-[20vw] px-5 py-10 fixed border-r-2 border-gray-500 h-screen">
      <div className="mb-10 text-black text-5xl font-extrabold">LOGO</div>
      <div className="flex flex-col gap-5">
        {SideBarData.map((item, idx) => (
          <div
            onClick={() => sideBarClickHandler(item.text)}
            key={idx}
            className={`flex items-center relative gap-5 cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-2 py-3 rounded-md ${
              location.pathname === item.path ? "bg-zinc-100" : ""
            }`}
          >
            {location.pathname === item.path
              ? item.activeIcon
              : item.deactiveIcon}
            <p className="text-2xl font-bold">{item.text}</p>
            {item.text === "Notifications" && likeNotification?.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size={"icon"}
                    className={
                      "rounded-full h-5 w-5 absolute bottom-6 left-6 bg-red-500 hover:bg-red-600"
                    }
                  >
                    {likeNotification?.length}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    {likeNotification?.length === 0 ? (
                      <p>No new notification</p>
                    ) : (
                      likeNotification?.map((notification) => (
                        <div key={notification?._id} className="flex gap-3 items-center">
                          <Avatar>
                            <AvatarImage
                              src={notification?.userDetails?.profilePicture}
                            />
                            <AvatarFallback>AK</AvatarFallback>
                          </Avatar>
                          <p className="text-sm">
                            <span className="font-bold">
                              {notification?.userDetails?.username}
                            </span>{"  "}
                            liked your post
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </div>
      <CreatePost open={createDialogOpen} setOpen={setCreateDialogOpen} />
    </div>
  );
};

export default SideBar;
