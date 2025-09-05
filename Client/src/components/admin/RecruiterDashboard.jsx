import React from "react";
import { Button } from "../ui/button";
import { Card,CardContent } from "../ui/card";
import { Briefcase, Users, PlusCircle } from "lucide-react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";


const RecruiterHome = () => {
  return (
    <>
    <div className="min-h-screen text-white bg-url">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/recruiterbg.png')", 
          backgroundColor: "rgba(30, 0, 50, 0.7)", 
          backgroundBlendMode: "multiply", 
        }}
      >
        <Navbar />
        

     
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 className=" text-4xl font-bold mb-4">
          Welcome Back, Recruiter
        </h1>
        <p className="text-zinc-300 mb-6">
          Post microjobs, manage applicants, and find the right talent fast.
        </p>
        <Button className="glow-effect bg-orange-500 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-lg">
          <PlusCircle className="inline mr-2" /> <Link to='/admin/createjob'>Post a New Job</Link>
        </Button>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glow-effect1 bg-white/10 border border-white/20 text-white shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Briefcase className="h-10 w-10 text-blue-400 mb-3" />
            <h2 className="text-xl font-semibold">Your Jobs</h2>
            <p className="text-zinc-400 mt-2">Manage all jobs you’ve posted</p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
              <Link to='/admin/viewjobs'>View Jobs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glow-effect1 bg-white/10 border border-white/20 text-white shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Users className="h-10 w-10 text-green-400 mb-3" />
            <h2 className="text-xl font-semibold">Anayltics</h2>
            <p className="text-zinc-400 mt-2">Track and review applications</p>
            <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2">
              <Link to='/admin/adminstats'>View Stats</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glow-effect1 bg-white/10 border border-white/20 text-white shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <PlusCircle className="h-10 w-10 text-yellow-400 mb-3" />
            <h2 className="text-xl font-semibold">Post a Job</h2>
            <p className="text-zinc-400 mt-2">Create a new microjob posting</p>
            <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2">
              <Link to='/admin/createjob'>Create Job</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      </div>
         
    </div>
    
    
    </>
  );
};

export default RecruiterHome;
