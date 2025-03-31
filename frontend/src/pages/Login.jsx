import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const valueChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/user/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center px-20 py-5">
      <form
        className="lg:w-1/2 shadow-lg rounded-md px-8 py-10 flex flex-col"
        onSubmit={submitHandler}
      >
        <div>
          <h1 className="text-3xl font-extrabold text-black text-center">
            LOGO
          </h1>
          <p className="text-sm font-semibold text-gray-600 text-center mt-2">
            Join our community and share your best moments with the world!
            Connect with friends, explore trending content, and express yourself
            like never before. Sign up now and start your journey!
          </p>
        </div>
        <div className="mt-5">
          <div className="my-5">
            <Label htmlFor={"email"}>E-mail</Label>
            <Input
              type={"email"}
              id={"email"}
              className={"focus-visible:ring-transparent"}
              name={"email"}
              value={input.email}
              onChange={valueChangeHandler}
            />
          </div>
          <div className="my-5">
            <Label htmlFor={"password"}>Password</Label>
            <Input
              type={"password"}
              id={"password"}
              className={"focus-visible:ring-transparent"}
              name={"password"}
              value={input.password}
              onChange={valueChangeHandler}
            />
          </div>
          <div className="-mt-5 mb-5 text-end">
            Already have an account?{" "}
            <Link
              to={"/register"}
              replace={true}
              className="text-blue-500 underline cursor-pointer"
            >
              Register
            </Link>
          </div>
          {loading ? (
            <Button disabled className={"cursor-pointer w-full"}>
              Please Wait...
            </Button>
          ) : (
            <Button type={"submit"} className={"cursor-pointer w-full"}>
              Login
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
