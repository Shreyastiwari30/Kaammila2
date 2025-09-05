import React, { useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message || "Something went wrong");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <div
      className="min-h-screen text-white bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900"
      
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Job Header */}
        <div className="bg-gray-900 bg-opacity-80 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold">{applicants?.title || "Job Applicants"}</h1>
          {applicants?.company && (
            <p className="text-gray-300 mt-1">Company: {applicants.company}</p>
          )}
          <p className="text-gray-400 mt-1">
            Total Applicants: {applicants?.applications?.length || 0}
          </p>
        </div>

        {/* Applicants Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 bg-opacity-80 rounded-xl shadow-lg p-5 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item?.applicant?.fullname || item?.applicant?.name || "NA"}</h2>
                  <p className="text-gray-300 mt-1">Email: {item?.applicant?.email || "NA"}</p>
                  <p className="text-gray-300 mt-1">Contact: {item?.applicant?.phoneNumber || "NA"}</p>
                  <p className="text-gray-400 mt-1 text-sm">Applied on: {item?.createdAt?.split("T")[0] || "NA"}</p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  {shortlistingStatus.map((status) => (
                    <button
                      key={status}
                      onClick={() => statusHandler(status, item._id)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold 
                        ${status === "Accepted" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} transition-colors`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full mt-5">No applicants found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
