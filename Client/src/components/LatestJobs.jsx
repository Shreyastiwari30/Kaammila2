import React from 'react'
import LatestJobscard from './LatestJobscard'
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="w-full py-20 px-6 bg-gradient-to-l from-[#1f2937] via-[#1d4ed8] to-[#111827]">
      <div className="max-w-6xl mx-auto">
       
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          <span className="bg-gradient-to-r from-fuchsia-300 to-purple-500 bg-clip-text text-transparent">Latest & Top</span> Job Openings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {
            allJobs.length <= 0 
              ? <span className="text-gray-300 text-center col-span-3">🚫 No Jobs Available</span> 
              : allJobs.slice(0, 6).map((job) => (
                  <LatestJobscard key={job._id} job={job} />
                ))
          }
        </div>
      </div>
    </div>
  )
}

export default LatestJobs;
