import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const imageRef = useRef(null);
  const [bio, setBio] = useState(user?.bio);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [gender, setGender] = useState(user?.gender);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) setProfilePicture(file);
  };

  const selectChangeHandler = (value) => setGender(value);

  const profileUpdateHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    try {
      formData.append("bio", bio);
      formData.append("gender", gender);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const res = await axios.post(
        "http://localhost:8080/user/profile/edit",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate(`/profile/${user?._id}`);
        toast.success(toast.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-[20vw]">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center gap-2 bg-gray-200 rounded-xl p-4 justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={"h-20 w-20 bg-gray-300"}>
              <AvatarImage src={profilePicture} alt="img" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-2">
              <h1 className="text-xl font-bold">{user?.username}</h1>
              <span className="text-gray-600 text-lg">
                {user?.bio || "Bio"}
              </span>
            </div>
          </div>
          <Button
            onClick={() => imageRef?.current.click()}
            className={"h-12 px-5 cursor-pointer"}
          >
            {user?.profilePicture === profilePicture
              ? "Change Photo"
              : "Image Selected"}
          </Button>
          <input
            accept="image/*"
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={fileChangeHandler}
          />
        </div>
        <div>
          <h1 className="font-bold text-xl">Bio</h1>
          <Textarea
            className={"h-36 focus-visible:ring-transparent"}
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <h1 className="font-bold text-xl">Gender</h1>
          <Select defaultValue={gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className={"w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button
              disabled
              className={"w-fit bg-blue-500 hover:bg-blue-600 cursor-pointer"}
            >
              <Loader2 className="animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              onClick={profileUpdateHandler}
              className={"w-fit bg-blue-500 hover:bg-blue-600 cursor-pointer"}
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
