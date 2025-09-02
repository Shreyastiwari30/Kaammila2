import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import AppliedJobtable from "./AppliedJobtable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
  <div className="min-h-screen bg-gradient-to-l from-gray-900 via-purple-700 to-gray-950 pb-10 text-white">
    
    <Navbar />
    <div
      className="max-w-4xl mx-auto shadow-2xl bg-gray-900/80 
                 border border-purple-500/20 rounded-3xl my-8 p-10 
                 hover:shadow-purple-500/30 transition-all duration-500"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div>
            <h1 className="font-semibold text-3xl text-purple-200">{user?.fullname}</h1>
            <p className="text-gray-400 mt-1">{user?.profile?.bio}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="text-black border-purple-500 hover:bg-purple-600 hover:text-white"
        >
          <Pen className="h-4 w-4" />
        </Button>
      </div>

      <div className="my-8 space-y-4">
        <div className="flex items-center gap-4">
          <Mail className="text-purple-400 h-5 w-5" />
          <span className="text-gray-300">{user?.email}</span>
        </div>
        <div className="flex items-center gap-4">
          <Contact className="text-purple-400 h-5 w-5" />
          <span className="text-gray-300">{user?.phoneNumber}</span>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold mb-3">Skills</h1>
        <div className="flex flex-wrap gap-2">
          {user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => (
              <Badge
                className="bg-yellow-600 text-white py-1 px-3 
                           rounded-full hover:bg-purple-700 hover:scale-105 
                           transition-transform duration-300"
                key={index}
              >
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>

      <div className="mt-6">
        <a
          href="#"
          className="text-purple-400 hover:text-purple-300 hover:underline
                     font-medium transition-colors duration-300"
        >
          Download Resume
        </a>
      </div>
    </div>

    <div
      className="max-w-4xl mx-auto bg-gray-900/80 border border-purple-500/20 
                 rounded-3xl hover:shadow-purple-500/30 transition-all duration-500"
    >
      <h1 className="text-xl font-bold p-6">Applied Jobs</h1>
      <AppliedJobtable/>
    </div>

    <UpdateProfileDialog open={open} setopen={setOpen} />
  </div>
);
}

export default Profile;
