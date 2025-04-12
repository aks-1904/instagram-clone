import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/authSlice";

const useGetUserProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/user/${id}/profile`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSelectedUser(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [id]);
};

export default useGetUserProfile;
