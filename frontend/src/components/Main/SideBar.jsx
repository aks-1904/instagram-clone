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
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

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
      text: "Explore",
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

  const sideBarClickHandler = (text) => {
    if (text === "Logout")
      navigate("/logout", {
        replace: true,
      });
    else if (text === "Create") setCreateDialogOpen(true);
  };

  return (
    <div className="w-[20vw] px-5 py-10">
      <div className="mb-10 text-black text-5xl font-extrabold">LOGO</div>
      <div className="flex flex-col gap-5">
        {SideBarData.map((item, idx) => (
          <div
            onClick={() => sideBarClickHandler(item.text)}
            key={idx}
            className={`flex items-center gap-5 cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-2 py-3 rounded-md ${
              location.pathname === item.path ? "bg-zinc-100" : ""
            }`}
          >
            {location.pathname === item.path
              ? item.activeIcon
              : item.deactiveIcon}
            <p className="text-2xl font-bold">{item.text}</p>
          </div>
        ))}
      </div>
      <CreatePost open={createDialogOpen} setOpen={setCreateDialogOpen} />
    </div>
  );
};

export default SideBar;
