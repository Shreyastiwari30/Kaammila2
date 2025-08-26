import React from 'react'
import Navbar from './Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAlljobs';


const Browse = () => {
   useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
   
  return ( 
    <>
      <div className='min-h-screen  text-white'>
        <Navbar/>

        <div className='max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8'>
          <h1 className='mb-4 text-lg sm:text-xl font-bold'>
            Search Results ({allJobs.length})
          </h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {allJobs.map((job)=>(
              <Job key={job._id} job={job}/>
            ))}
          </div>
        </div>

        
      </div>
    </>
  )
}

export default Browse
