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
  <div className="min-h-screen bg-gradient-to-br from-[#1d1b38] to-[#4c2d9e] flex justify-center items-center p-4">
    <style>
        {`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6, 0 0 40px rgba(139, 92, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 15px #8b5cf6, 0 0 25px #8b5cf6, 0 0 35px #8b5cf6, 0 0 45px rgba(139, 92, 246, 0.6);
          }
        }
        .form-animate {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        `}
      </style>
    <form
      onSubmit={submithandler}
      className="bg-gray-900/70 w-full max-w-md border border-gray-700 rounded-3xl p-8 my-10 shadow-2xl backdrop-blur-md form-animate"
    >
      <h1 className="font-bold text-3xl my-5 text-purple-400 text-center">
        Login
      </h1>
      <div className="flex flex-col gap-6">
        <div>
          <Label className="font-medium text-gray-200">Email</Label>
          <Input
            type="email"
            placeholder="xyz@gmail.com"
            name="email"
            value={input.email}
            onChange={changeeventhandler}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
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
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="mt-6 mb-3 flex items-center justify-start">
        <RadioGroup className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              className="cursor-pointer appearance-none w-5 h-5 rounded-full border-2 border-purple-500 bg-gray-800 checked:bg-purple-600 checked:border-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              name="role"
              value="Employee"
              type="radio"
              checked={input.role === "Employee"}
              onChange={changeeventhandler}
            />
            <Label className="text-gray-300">Employee</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="cursor-pointer appearance-none w-5 h-5 rounded-full border-2 border-purple-500 bg-gray-800 checked:bg-purple-600 checked:border-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
          className="w-full my-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full my-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors"
        >
          Login
        </Button>
      )}

      <div className="text-center">
        <span className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link className="text-purple-400 hover:underline" to="/signup">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  </div>
);
}

export default Login;
