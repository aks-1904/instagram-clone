import React from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSearchOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BiMessageSquare, BiSolidMessageSquare } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoLogOutSharp } from "react-icons/io5";

const SideBar = () => {
  const location = useLocation();

  const SideBarData = [
    {
      path: "/home",
      deactiveIcon: <IoHomeOutline size={30} />,
      activeIcon: <IoHome size={30} />,
      text: "Home",
    },
    {
      path: "/search",
      deactiveIcon: <IoSearchOutline size={30} />,
      activeIcon: <IoSearchSharp size={30} />,
      text: "Search",
    },
    {
      path: "/explore",
      deactiveIcon: <MdOutlineExplore size={30} />,
      activeIcon: <MdExplore size={30} />,
      text: "Explore",
    },
    {
      path: "/chat",
      deactiveIcon: <BiMessageSquare size={30} />,
      activeIcon: <BiSolidMessageSquare size={30} />,
      text: "Explore",
    },
    {
      path: "/notifications",
      deactiveIcon: <FaRegHeart size={30} />,
      activeIcon: <FaHeart size={30} />,
      text: "Notifications",
    },
    {
      path: "/create",
      deactiveIcon: <CiSquarePlus size={30} />,
      activeIcon: <CiSquarePlus size={30} />,
      text: "Create",
    },
    {
      path: "/profile",
      deactiveIcon: (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="img" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
      ),
      activeIcon: (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="img" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    {
      path: "/logout",
      deactiveIcon: <IoLogOutSharp size={30} />,
      activeIcon: <IoLogOutSharp size={30} />,
      text: "Logout",
    },
  ];

  return (
    <div className="w-[20vw] px-5 py-10">
      <div className="mb-10 text-black text-5xl font-extrabold">
        LOGO
      </div>
      <div className="flex flex-col gap-5">
        {SideBarData.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center gap-5 cursor-pointer hover:bg-zinc-100 transition-colors duration-200 px-2 py-3 rounded-md ${
              location.pathname === item.path ? "bg-zinc-100" : ""
            }`}
          >
            {location.pathname === item.path
              ? item.activeIcon
              : item.deactiveIcon}
            <p className="text-2xl font-bold">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
