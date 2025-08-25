import React from 'react'
import { Badge } from './ui/badge'

const LatestJobscard = ({ job }) => {
  return (
    <div className='p-5 rounded-xl shadow-lg bg-gray-900/60 backdrop-blur border border-gray-600 
                    hover:border-blue-500 hover:scale-105 transition-all duration-300 cursor-pointer'>
      
      {/* Company */}
      <div className="mb-3">
        <h1 className='font-medium text-lg text-white'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-400'>India</p>
      </div>

      {/* Job Info */}
      <div className="mb-3">
        <h1 className='font-semibold text-xl text-orange-400'>{job?.title}</h1>
        <p className='text-sm text-gray-300 line-clamp-2'>{job?.description}</p>
      </div>

      {/* Badges */}
      <div className='flex items-center flex-wrap gap-2 mt-4'>
        <Badge variant='ghost' className="bg-blue-600/20 text-blue-400 border border-blue-500">
          {job?.position}
        </Badge>
        <Badge variant='ghost' className="bg-green-600/20 text-white border border-green-500">
          {job?.jobType}
        </Badge>
        <Badge variant='ghost' className="bg-purple-600/20 text-purple-400 border border-purple-500">
          ₹ {job?.salary}
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobscard
