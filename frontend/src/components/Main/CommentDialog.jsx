import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentDialog = (props) => {
  const { selectedPost } = useSelector((store) => store.post);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className={"min-w-[60vw] p-0 flex flex-col"}>
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={selectedPost?.image}
              alt="img"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2 p-2">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <Link>
                    <Avatar>
                      <AvatarImage src={selectedPost?.author?.profilePicture} />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col ml-2 gap-1">
                    <Link className="font-semibold text-sm">
                      {selectedPost?.author?.username}
                    </Link>
                    <span className="text-xs">{selectedPost?.author?.bio}</span>
                  </div>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger className={"pr-10"}>
                      <BsThreeDotsVertical
                        size={30}
                        className="cursor-pointer"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <Button
                        variant={"ghost"}
                        className={
                          "cursor-pointer my-3 text-red-500 hover:text-red-600 font-bold"
                        }
                      >
                        Unfollow
                      </Button>
                      <Button
                        variant={"ghost"}
                        className={"cursor-pointer font-bold"}
                      >
                        Add to favourite
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-gray-200"></div>
            <div className="flex-1 max-h-[60vh] overflow-y-auto p-4">
              {selectedPost?.comments?.map((comment) => (
                <Comment key={comment?._id} comment={comment} />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Input
                value={props.comment}
                onChange={(e) => props.setComment(e.target.value)}
                type="text"
                placeholder="Add a comment..."
                className="focus-visible:outline-none w-full"
              />
              {props.comment.trim() && (
                <span
                  onClick={props.commentHandler}
                  className="text-blue-500 text-bold hover:underline cursor-pointer"
                >
                  Send
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
