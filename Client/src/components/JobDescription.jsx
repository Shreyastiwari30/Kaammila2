import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSinglejob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";

const Description = () => {
  const { user } = useSelector((store) => store.auth);
  const { singlejob } = useSelector((store) => store.job);

  const isInitiallyApplied =
    (singlejob?.applications || []).some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobid = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singlejob,
          applications: [
            ...(singlejob.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSinglejob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSinglejob(res.data.job));
          setIsApplied(
            (res.data.job.applications || []).some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSinglejob();
  }, [jobid, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto p-7 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singlejob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singlejob?.position}
            </Badge>
            <Badge variant="ghost" className="text-orange-700 font-bold">
              {singlejob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-purple-700 font-bold">
              {singlejob?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-md ${
            isApplied ? "bg-zinc-700" : "bg-purple-700 hover:bg-purple-900"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-semibold py-4">
        Job Description
      </h1>

      <div>
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singlejob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singlejob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singlejob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.experience}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singlejob?.salary ? `${singlejob.salary} Rs.` : "Not Disclosed"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singlejob?.applications?.length || 0}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-400">
            {singlejob?.createdAt
              ? new Date(singlejob.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Description;
