import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "../../redux/postSlice";
import { Badge } from "@/components/ui/badge";

const Post = ({ data }) => {
  const [comment, setComment] = useState("");
  const [commentDialog, setCommentDialog] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id));
  const [postLike, setPostLike] = useState(data?.likes?.length);
  const [allPostComments, setAllPostComments] = useState(data?.comments);

  const deletePostHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/post/delete/${data?._id}`,
        {
          withCredentials: true,
        }
      );

      console.log(data?._id);

      if (res.data.success) {
        const updatedPostData = posts.filter((item) => item?._id !== data?._id);
        dispatch(setPosts(updatedPostData));
        setOpen(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8080/post/${action}/${data?._id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setLiked(!liked);
        setPostLike(updatedLikes);

        const updatedPostData = posts?.map((post) =>
          post?._id === post?._id
            ? {
                ...post,
                likes: liked
                  ? post?.likes.filter((id) => id !== user?._id)
                  : [...post?.likes, user?._id],
              }
            : post
        );
        dispatch(setPosts(updatedPostData));

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/post/comment/${data?._id}`,
        { text: comment },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedComments = [...allPostComments, res.data.comment];
        setAllPostComments(updatedComments);

        const updatedPostData = posts.map((p) =>
          p?._id === data?._id
            ? {
                ...p,
                comments: updatedComments,
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        setComment("");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-w-[20vw] max-w-[40vw]">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center cursor-pointer">
          <Avatar>
            <AvatarImage src={data?.author?.profilePicture} alt="img" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <p>{data?.author?.username}</p>
          {user?._id === data?.author?._id && <Badge variant={"secondary"}>Author</Badge>}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className={"cursor-pointer"}>
            <BsThreeDotsVertical onClick={() => setOpen(true)} size={30} />
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
            {user && data?.author?._id === user?._id && (
              <Button
                onClick={deletePostHandler}
                className={
                  "py-5 px-9 text-red-500 bg-white border-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
                }
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <img
          className="rounded-md aspect-auto w-[30vw]"
          src={data?.image}
          alt="post_img"
        />
      </div>
      <div className="flex mt-3 items-center justify-between">
        <div className="flex gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={30}
              className="cursor-pointer text-red-500 hover:text-red-400"
            />
          ) : (
            <FaRegHeart
              onClick={() => likeOrDislikeHandler(data?._id)}
              size={30}
              className="cursor-pointer hover:text-gray-600"
            />
          )}
          <FaRegComment
            onClick={() => {
              dispatch(setSelectedPost(data));
              setCommentDialog(true);
            }}
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
      <span className="font-medium block my-2">{postLike} likes</span>
      <p className="mb-3">
        <span className="font-medium mr-2">{data?.author?.username}</span>
        <span className="text-gray-700">{data?.caption}</span>
      </p>
      {data?.comments.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(data));
            setCommentDialog(true);
          }}
          className="hover:underline text-gray-600 cursor-pointer"
        >
          View all {data?.comments.length} comments
        </span>
      )}
      <CommentDialog
        commentHandler={commentHandler}
        open={commentDialog}
        setOpen={setCommentDialog}
        comment={comment}
        setComment={setComment}
      />
      <div className="flex items-center justify-between">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="outline-none text-sm w-full"
        />
        {comment.trim() && (
          <span
            onClick={commentHandler}
            className="text-blue-500 cursor-pointer"
          >
            Send
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
