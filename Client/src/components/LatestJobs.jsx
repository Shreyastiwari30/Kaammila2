import React from 'react';
import LatestJobscard from './LatestJobscard';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs = [] } = useSelector(store => store.job); // fallback to empty array

  // Sort jobs by latest createdAt (optional, if your jobs have createdAt field)
  const latestJobs = [...allJobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          <span className="bg-gradient-to-r from-fuchsia-300 to-purple-500 bg-clip-text text-transparent">
            Latest & Top
          </span>{' '}
          Job Openings
        </h1>

        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {latestJobs.length === 0 ? (
            <span className="text-gray-300 text-center col-span-3">
              🚫 No Jobs Available
            </span>
          ) : (
            latestJobs.map((job) => <LatestJobscard key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
