import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = () => {
  const [comment, setComment] = useState("");
  const [commentDialog, setCommentDialog] = useState(false);

  return (
    <div className="min-w-[20vw] max-w-[40vw]">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center cursor-pointer">
          <Avatar>
            <AvatarImage src="" alt="img" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <p>username</p>
        </div>
        <Dialog>
          <DialogTrigger className={"cursor-pointer"}>
            <BsThreeDotsVertical size={30} />
          </DialogTrigger>
          <DialogContent className="grid grid-cols-1 items-center">
            <Button
              className={
                "py-5 px-9 text-red-500 bg-white border-2 border-gray-200 hover:bg-gray-100 cursor-pointer mt-5"
              }
            >
              Unfollow
            </Button>
            <Button
              className={
                "py-5 px-9 text-black bg-white border-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
              }
            >
              Add to favourite
            </Button>
            <Button
              className={
                "py-5 px-9 text-red-500 bg-white border-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
              }
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <img
          className="rounded-md aspect-auto max-w-[30vw]"
          src="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"
          alt="post_img"
        />
      </div>
      <div className="flex mt-3 items-center justify-between">
        <div className="flex gap-3">
          <FaRegHeart
            size={30}
            className="cursor-pointer hover:text-gray-600"
          />
          <FaRegComment
            onClick={() => setCommentDialog(true)}
            size={30}
            className="cursor-pointer hover:text-gray-600"
          />
          <IoIosSend size={30} className="cursor-pointer hover:text-gray-600" />
        </div>
        <div>
          <FaRegBookmark
            size={30}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>
      </div>
      <span className="font-medium block my-2">1k likes</span>
      <p className="mb-3">
        <span className="font-medium mr-2">username</span>
        <span className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          consequatur vero dolorum corporis nostrum vitae minus harum
          perferendis, provident fuga.
        </span>
      </p>
      <span
        onClick={() => setCommentDialog(true)}
        className="hover:underline text-gray-600 cursor-pointer"
      >
        View all 20 comments
      </span>
      <CommentDialog open={commentDialog} setOpen={setCommentDialog} comment={comment} setComment={setComment} />
      <div className="flex items-center justify-between">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="outline-none text-sm w-full"
        />
        {comment.trim() && (
          <span className="text-blue-500 cursor-pointer">Send</span>
        )}
      </div>
    </div>
  );
};

export default Post;
