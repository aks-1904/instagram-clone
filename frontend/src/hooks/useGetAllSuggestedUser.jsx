import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSuggestedUsers } from "../redux/authSlice";

const useGetAllSuggestedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllSuggestedUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/user/suggested-user",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSuggestedUsers(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllSuggestedUsers();
  }, []);
};

export default useGetAllSuggestedUsers;
