import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutHandler = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/logout", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAuthUser(null));
          toast.success(res.data.message);
          navigate("/login", {
            replace: true,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/home", {
          replace: true,
        });
      }
    };

    logoutHandler();
  }, []);

  return <div></div>;
};

export default Logout;
