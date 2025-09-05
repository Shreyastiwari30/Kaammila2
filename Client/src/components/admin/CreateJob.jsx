import React, { useState } from "react";
import Navbar from "../Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CreateJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    budget: "",
    duration: "",
    location: "",
    jobType: "",
    position: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/viewjobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center w-full py-10">
        <form
          onSubmit={submitHandler}
          className="bg-gray-800 text-gray-100 p-8 max-w-3xl rounded-2xl shadow-2xl w-full space-y-6"
        >
          <h1 className="text-2xl font-bold mb-4 text-white">Post a New Job</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Job title"
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Job description"
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Required skills or experience"
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>

            <div>
              <Label>Budget</Label>
              <Input
                type="text"
                name="budget"
                value={input.budget}
                onChange={changeEventHandler}
                placeholder="e.g. ₹500 - ₹2000"
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>

            <div>
              <Label>Duration</Label>
              <Input
                type="text"
                name="duration"
                value={input.duration}
                onChange={changeEventHandler}
                placeholder="e.g. 2 hours, 1 day, multi-day task"
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Job location"
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>

            <div>
  <Label>Job Type</Label>
  <select
    name="jobType"
    value={input.jobType}
    onChange={changeEventHandler}
    className="my-1 bg-gray-700 text-gray-100 border-gray-600 rounded-md w-full p-2"
  >
    <option value="">Select job type</option>
    <option value="Delivery & Pickup">Delivery & Pickup</option>
    <option value="House Cleaning">House Cleaning</option>
    <option value="Repairs & Maintenance">Repairs & Maintenance</option>
    <option value="Tutoring & Lessons">Tutoring & Lessons</option>
    <option value="Pet Care">Pet Care</option>
    <option value="Event Help">Event Help</option>
    <option value="Grocery Shopping">Grocery Shopping</option>
    <option value="Gardening">Gardening</option>
    <option value="Freelance">Freelance</option>
    <option value="Part-time">Part-time</option>
    <option value="Other">Other</option>
    <option value="One-time">One-time</option>
  </select>
</div>


            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1 bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center"
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
