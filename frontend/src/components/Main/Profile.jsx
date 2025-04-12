import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AtSign, User } from "lucide-react";
import { FaComment, FaHeart } from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  useGetUserProfile(id);

  const { selectedUser, user } = useSelector((store) => store.auth);
  const isLoggedInUser = user?._id === id;

  const [activeTab, setActiveTab] = useState("Posts");

  const displayedPost = selectedUser?.posts;

  return (
    <div>
      <div className="mt-20 flex justify-center w-full">
        <div className="flex flex-col gap-20 p-8"></div>
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className={"h-32 w-32"}>
              <AvatarImage src={selectedUser?.profilePicture} />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 flex-col">
                <div className="flex gap-3 items-center">
                  <span>{selectedUser?.username}</span>
                  <div className="flex gap-3">
                    {isLoggedInUser ? (
                      <>
                        <Button
                          variant="secondary"
                          className={"hover:bg-gray-200 h-8"}
                        >
                          Edit Profile
                        </Button>
                        <Button
                          variant="secondary"
                          className={"hover:bg-gray-200 h-8"}
                        >
                          View archieve
                        </Button>
                      </>
                    ) : user?.following?.includes(id) ? (
                      <>
                        <Button variant={"secondary"} className={"h-8"}>
                          Unfollow
                        </Button>
                        <Button variant={"secondary"} className={"h-8"}>
                          Message
                        </Button>
                      </>
                    ) : (
                      <Button className={"bg-[#0095F6] hover:bg-[#3192d2] h-8"}>
                        Follow
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <p className="font-semibold">
                    {selectedUser?.posts?.length} <span>posts</span>
                  </p>
                  <p className="font-semibold">
                    {selectedUser?.followers?.length} <span>followers</span>
                  </p>
                  <p className="font-semibold">
                    {selectedUser?.following?.length} <span>following</span>
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <span>{selectedUser?.bio || "Bio"}</span>
                  <Badge variant={"secondary"} className="w-fit -mt-2 -ml-2">
                    <AtSign />
                    {selectedUser?.username}
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="border-t-2 border-t-gray-100 mt-5 ml-[20vw]">
        <div className="items-center justify-center flex gap-10 text-sm">
          <span
            onClick={() => setActiveTab("Posts")}
            className={`py-3 cursor-pointer uppercase text-lg ${
              activeTab === "Posts" && "font-bold underline"
            }`}
          >
            Posts
          </span>
          {isLoggedInUser && (
            <span
              onClick={() => setActiveTab("Saved")}
              className={`py-3 cursor-pointer uppercase text-lg ${
                activeTab === "Saved" && "font-bold underline"
              }`}
            >
              Saved
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 overflow-hidden">
          {activeTab === "Posts" &&
            displayedPost?.map((data) => (
              <div
                key={data?._id}
                className="relative cursor-pointer overflow-hidden group"
              >
                <img
                  src={data?.image}
                  alt="img"
                  className="rounded-sm object-cover aspect-square w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <Button
                      className={"flex items-center gap-2 hover:text-gray-300"}
                    >
                      <FaHeart />
                      <span>{data?.likes?.length}</span>
                    </Button>
                    <Button
                      className={"flex items-center gap-2 hover:text-gray-300"}
                    >
                      <FaComment />
                      <span>{data?.comments?.length}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {isLoggedInUser &&
            activeTab === "Saved" &&
            user?.bookmarks?.map((data) => (
              <div
                key={data?._id}
                className="relative cursor-pointer overflow-hidden group"
              >
                <img
                  src={data?.image}
                  alt="img"
                  className="rounded-sm object-cover aspect-square w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <Button
                      className={"flex items-center gap-2 hover:text-gray-300"}
                    >
                      <FaHeart />
                      <span>{data?.likes?.length}</span>
                    </Button>
                    <Button
                      className={"flex items-center gap-2 hover:text-gray-300"}
                    >
                      <FaComment />
                      <span>{data?.comments?.length}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
