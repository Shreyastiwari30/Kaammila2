import React, { useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);

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
            {allJobs.length <= 0 ? (
              <span className="text-gray-400">Jobs Not Found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allJobs.map((job) => (
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
