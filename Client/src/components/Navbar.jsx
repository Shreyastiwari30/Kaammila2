import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "../redux/authslice";
import { persistor } from "../redux/store";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        persistor.purge();
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks = user && user.role === "Recruiter"
    ? [
        { to: "/admin/applicants", label: "Applications" },
        { to: "/admin/viewjobs", label: "Jobs" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/jobs", label: "Jobs" },
        { to: "/browse", label: "Browse" },
      ];

  return (
    <div className="bg-transparent text-slate-300 mb-10">
      <div className="flex justify-between items-center p-5 max-w-7xl m-auto h-16">
        
        
        <div className="w-24 mt-3 sm:w-28">
          <img src={logo} alt="KaamMila Logo" className="w-full" />
        </div>

       
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-10 font-semibold">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  className="text-slate-300 hover:text-white transition"
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          
          {!user ? (
            <div className="flex gap-2">
              <Link to="/Login">
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium shadow-sm hover:bg-slate-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold shadow hover:opacity-95">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="rounded-3xl cursor-pointer ring-2 ring-purple-500 hover:ring-purple-400 transition">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 border border-gray-700 rounded-2xl shadow-lg p-4">
                
                <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-3">
                  <Avatar className="rounded-3xl">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-sm">
                      {user?.fullname || "User"}
                    </h4>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                </div>

                
                <div className="flex flex-col gap-2">
                  {user?.role === "Employee" && (
                    <div className="flex items-center gap-2">
                      <User2 className="text-purple-400 w-4 h-4" />
                      <Button
                        variant="link"
                        className="text-gray-300 hover:text-purple-400 p-0 h-auto"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="text-red-400 w-4 h-4" />
                    <Button
                      variant="link"
                      className="text-gray-300 hover:text-red-400 p-0 h-auto"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-4 space-y-4">
          <ul className="flex flex-col gap-4 font-semibold">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  className="block text-slate-300 hover:text-white transition"
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {!user ? (
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/Login">
                <Button className="w-full bg-white text-slate-900 font-medium hover:bg-slate-100">
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:opacity-95">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              onClick={logoutHandler}
              className="w-full mt-4 bg-red-500 hover:bg-red-600"
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
