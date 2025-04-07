import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { readFileAsDataUrl } from "../../lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.post);

  const createPostHandler = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (imagePreview) formData.append("image", file);

      const res = await axios.post("http://localhost:8080/post/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);

  const fileChangeHandler = async (e) => {
    const file = e.target?.files?.[0];

    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);

      setImagePreview(dataUrl);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className={"text-center font-semibold"}>
          Create New Post
        </DialogHeader>
        <div onSubmit={createPostHandler} className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt={"image"} />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm">{user?.username}</h1>
            <span className="text-gray-600 text-xs">{user?.bio}</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={"focus-visible:ring-transparent border-none"}
          placeholder={"Caption..."}
        />
        {imagePreview && (
          <div>
            <img
              className="w-full max-h-[50vh] flex items-center justify-center"
              src={imagePreview}
              alt="img"
            />
          </div>
        )}
        <input
          accept="image/*"
          id="image"
          type="file"
          className="hidden"
          ref={imageRef}
          onChange={(e) => fileChangeHandler(e)}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className={
            "w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] cursor-pointer"
          }
        >
          Select an image
        </Button>

        {imagePreview &&
          (loading ? (
            <Button disabled>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              type={"submit"}
              className={"w-full"}
              onClick={createPostHandler}
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
