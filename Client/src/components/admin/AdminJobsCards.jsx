import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, Edit2 } from "lucide-react";

const AdminJobsCards = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!filterJobs || filterJobs.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10 text-lg">No jobs found.</p>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {filterJobs.map((job) => (
        <div
          key={job._id}
          className="glow-effect1 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-6 rounded-2xl shadow-xl transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-700"
        >
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2 truncate">
              {job.title}
            </h2>
            <p className="text-gray-300 mb-3 line-clamp-3">{job.description}</p>

            <div className="text-gray-400 text-sm space-y-1">
              {job.requirements && (
                <p>
                  <strong>Requirements:</strong> {job.requirements}
                </p>
              )}
              {job.budget && (
                <p>
                  <strong>Budget: </strong> {job.budget}
                </p>
              )}
              {job.location && (
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
              )}
              
              {job.jobType && (
                <p>
                  <strong>Job Type:</strong> {job.jobType}
                </p>
              )}
              {job.experience && (
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
              )}
              <p>
                <strong>Positions:</strong> {job.position}
              </p>
            </div>

            <p className="text-gray-500 text-xs mt-3">
              Posted on: {job.createdAt.split("T")[0]}
            </p>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition"
            >
              <Eye className="w-4 h-4" />
              Applicants
            </button>
            <button
              onClick={() => navigate(`/admin/jobs/${job._id}`)}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-medium transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminJobsCards;
