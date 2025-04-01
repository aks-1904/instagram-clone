import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutHandler = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/logout", {
          withCredentials: true,
        });

        if (res.data.success) {
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
