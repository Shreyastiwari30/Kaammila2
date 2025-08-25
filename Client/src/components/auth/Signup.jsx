import React, { useState } from "react";
import Navbar from "../Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/redux/authslice";

const Signup = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeeventhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const changefilehandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    dispatch(setloading(true));
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
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
            Signup
          </h1>

          <div className="flex flex-col gap-4">
            <div>
              <Label className="font-medium text-gray-200">Full name</Label>
              <Input
                type="text"
                placeholder="FFF"
                name="fullname"
                value={input.fullname}
                onChange={changeeventhandler}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
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
              <Label className="font-medium text-gray-200">Phone Number</Label>
              <Input
                type="text"
                placeholder="9098257357"
                name="phonenumber"
                value={input.phonenumber}
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

          <div className="mt-5 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
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

            <div className="flex items-center gap-2">
              <Label className="text-gray-200">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer bg-gray-800 border-gray-600 text-white"
                onChange={changefilehandler}
              />
            </div>
          </div>

          {loading ? (
            <Button
              type="submit"
              className="w-full py-4 mt-5 bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-4 mt-5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              Signup
            </Button>
          )}

          <span className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link className="text-yellow-400 hover:underline" to="/login">
              Login now
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
