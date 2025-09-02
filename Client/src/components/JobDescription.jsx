import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobid } = useParams();

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchSinglejob = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.job) {
        // Data found: dispatch the new job
        const fetchedJob = res.data.job;
        dispatch(setSingleJob(fetchedJob));
        setIsApplied(
          (fetchedJob.applications || []).some(
            (app) => app.applicant === user?._id
          )
        );
      } else {
        // Data not found: explicitly clear the Redux state
        dispatch(setSingleJob(null));
        toast.error("Job details not found.");
      }
    } catch (error) {
      console.error("Failed to fetch job details:", error);
      toast.error("Failed to fetch job details");
      // On API error, also clear the state
      dispatch(setSingleJob(null));
    } finally {
      setLoading(false);
    }
  };

  fetchSinglejob();
}, [jobid, dispatch, user?._id]);
console.log("Current singlejob state:", singleJob);
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobid}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-white">Loading job details...</div>;
  }

  if (!singleJob) {
    return <div className="text-center mt-20 text-white">Job not found</div>;
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto p-6 text-white space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="ghost" className="text-blue-500 font-bold">
              Positions: {singleJob?.position}
            </Badge>
            <Badge variant="ghost" className="text-orange-500 font-bold">
              Type: {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-purple-500 font-bold">
              Budget: {singleJob?.budget ? `${singleJob.budget} Rs.` : "N/A"}
            </Badge>
            <Badge variant="ghost" className="text-green-500 font-bold">
              Duration: {singleJob?.duration || "N/A"}
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-md ${isApplied ? "bg-zinc-700" : "bg-purple-700 hover:bg-purple-900"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl space-y-3">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Job Details</h2>
        <div className="space-y-1 text-gray-300">
          <p><strong>Role:</strong> {singleJob.title}</p>
          <p><strong>Location:</strong> {singleJob.location}</p>
          <p><strong>Description:</strong> {singleJob.description}</p>
          <p><strong>Total Applicants:</strong> {singleJob.applications?.length || 0}</p>
          <p><strong>Posted Date:</strong> {singleJob.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl space-y-2">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Job Poster</h2>
        <div className="text-gray-300 space-y-1">
          <p><strong>Name:</strong> {singleJob.created_by?.fullname || "N/A"}</p>
          <p><strong>Email:</strong> {singleJob.created_by?.email || "N/A"}</p>
          {singleJob.created_by?.phoneNumber && <p><strong>Phone:</strong> {singleJob.created_by.phoneNumber}</p>}
        </div>
      </div>

      <Button className="bg-purple-800 text-sm flex items-center gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back to Jobs
      </Button>
    </div>
  );
};

export default JobDescription;
