import React, { useState } from "react";
import Navbar from "../Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeeventhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-gray-900 via-blue-700 to-gray-800 text-white">
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <form
          onSubmit={submithandler}
          className="bg-gray-900/70 w-full sm:w-1/2 border border-gray-700 rounded-2xl p-6 my-10 shadow-xl backdrop-blur-md"
        >
          <h1 className="font-bold text-3xl my-5 text-yellow-400 text-center">
            Login
          </h1>
          <div className="flex flex-col gap-4">
            <div>
              <Label className="font-medium text-gray-200">Email</Label>
              <Input
                type="email"
                placeholder="xyz@gmail.com"
                name="email"
                value={input.email}
                onChange={changeeventhandler}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Label className="font-medium text-gray-200">Password</Label>
              <Input
                type="password"
                placeholder="********"
                name="password"
                value={input.password}
                onChange={changeeventhandler}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-4 mb-3 flex items-center justify-between">
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Input
                  className="cursor-pointer"
                  name="role"
                  value="Employee"
                  type="radio"
                  checked={input.role === "Employee"}
                  onChange={changeeventhandler}
                />
                <Label className="text-gray-300">Employee</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  className="cursor-pointer"
                  name="role"
                  value="Recruiter"
                  type="radio"
                  checked={input.role === "Recruiter"}
                  onChange={changeeventhandler}
                />
                <Label className="text-gray-300">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button
              className="w-full my-4 bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              Login
            </Button>
          )}

          <span className="text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link className="text-yellow-400 hover:underline" to="/signup">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
