import React, { useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";

const Jobs = () => {
  const { allJobs = [], searchedQuery = "", filters = {} } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);

  const filteredJobs = allJobs.filter((job) => {
  const title = job?.title ? job.title.toString().toLowerCase() : "";
  const company = job?.company ? job.company.toString().toLowerCase() : "";
  const location = job?.location ? job.location.toString().toLowerCase() : "";
  const jobType = job?.jobType ? job.jobType.toString().toLowerCase() : "";
  const budget = job?.budget ? job.budget.toString().toLowerCase() : "";
  const duration = job?.duration ? job.duration.toString().toLowerCase() : "";

  const query = searchedQuery.toLowerCase();

  // Matches search query
  const matchesQuery =
    title.includes(query) ||
    company.includes(query) ||
    location.includes(query) ||
    jobType.includes(query);

  // Matches selected filters
  const matchesFilters =
    (!filters.Category || jobType === filters.Category.toLowerCase()) &&
    (!filters.Location || location === filters.Location.toLowerCase()) &&
    (!filters.Budget || budget === filters.Budget.toLowerCase()) &&
    (!filters.Duration || duration === filters.Duration.toLowerCase());

  return matchesQuery && matchesFilters;
});


  return (
    <div>
      <Navbar />

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:mt-4">
        <Link to="/">
          <p className="hover:underline text-zinc-400 text-sm sm:text-base">
            ← Back to Home
          </p>
        </Link>

        <div className="flex justify-end md:hidden mt-3">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm bg-gray-100 hover:bg-gray-200"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div
            className={`w-full md:w-1/4 lg:w-1/5 ${
              showFilter ? "block" : "hidden md:block"
            }`}
          >
            <FilterCard />
          </div>

          <div className="flex-1 h-[80vh] overflow-y-auto">
            {filteredJobs.length <= 0 ? (
              <span className="text-gray-400">
                No jobs found for "{searchedQuery}"
              </span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
