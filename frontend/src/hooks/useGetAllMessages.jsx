import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/chatSlice";

const useGetAllMessages = () => {
  const dispatch = useDispatch();
  const { chatUser } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/message/all/${chatUser?._id}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMessages();
  }, [chatUser]);
};

export default useGetAllMessages;
