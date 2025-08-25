import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsCards from './AdminJobsCards'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Link } from 'react-router-dom'
import { ArrowLeftCircle } from 'lucide-react'

const ViewJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 '>
        <p className='text-zinc-300 text-sm flex flex-row gap-2'><ArrowLeftCircle className='text-sm w-5 h-5' /><Link to='/admin/dashboard'>Back to dashboard</Link> </p>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/createjob")}>New Jobs</Button>
        </div>
        <AdminJobsCards />
      </div>
    </div>
  )
}

export default ViewJobs