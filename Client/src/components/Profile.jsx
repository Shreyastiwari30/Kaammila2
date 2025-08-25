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
    <div className="min-h-screen bg-gradient-to-l from-gray-900 via-blue-700 to-gray-950 pb-10 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto shadow-lg bg-gray-800 border border-gray-700 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl">{user?.fullname}</h1>
              <p className="text-gray-300">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-black border-gray-500 hover:bg-blue-600"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="text-sm flex items-center gap-4 my-2">
            <Mail className="text-blue-400" />
            <span>{user?.email}</span>
          </div>
          <div className="text-sm flex items-center gap-4 my-2">
            <Contact className="text-blue-400" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-2">Skills</h1>
          {user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => (
              <Badge
                className="mr-2 bg-blue-600 text-white hover:bg-blue-700"
                key={index}
              >
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>

        <div className="mt-3">
          <Link className="text-yellow-400 hover:underline">
            Download Resume
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl">
        <h1 className="text-lg font-bold p-5">Applied Jobs</h1>
        <AppliedJobtable />
      </div>

      <UpdateProfileDialog open={open} setopen={setOpen} />
    </div>
  );
};

export default Profile;
