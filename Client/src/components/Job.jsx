import React from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar,AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({job}) => {
  const jobid="jfurvyufrebcrebvoev";
  const navigate=useNavigate();
  
  const daysago=(MongoDbtime)=>{
      const createdat=new Date(MongoDbtime);
      const currtime=new Date();
      const timeago=currtime-createdat;
      return Math.floor(timeago/(1000*60*24*60));
  }

  return (
    <div className='hover:scale-105 hover:rounded-md duration-700 rounded-md p-5 shadow-xl bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100'>
      <div className='flex items-center justify-between'>
         <p className='text-[14px] text-zinc-500'>{daysago(job?.createdAt) === 0 ? "Today" : `${daysago(job?.createdAt)} days ago`}</p>
         <Button variant="outline" className="rounded-full text-white bg-transparent border-none hover:bg-transparent" size='icons' ><Bookmark/></Button>
      </div>
       <div className='flex items-center gap-2 my-2'>
        <Button className="w-11 rounded-full border border-black">
          <Avatar>
            <AvatarImage src="data:image/jpeg;base64,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"/>
          </Avatar>
        </Button>
        <div className='flex flex-col ml-3'>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-zinc-300'>India</p>
        </div>
        
      </div>
      <div className='flex gap-2 flex-col'>
        <h1 className='font-bold text-xl'>{job?.title}</h1>
        <p className=' text-zinc-300 text-sm'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant='ghost' className="text-blue-700 font-bold">{job?.position} Positions</Badge>
        <Badge variant='ghost' className="text-orange-500 font-bold">{job?.location}</Badge>
        <Badge variant='ghost' className="text-purple-700 font-bold">{job?.salary}LPA</Badge>
      </div>
      <div className='flex gap-4 mt-4'>
        <Button className='text-black hover:bg-purple-500' variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-gradient-to-r from-purple-500 to-purple-600 font-bold">Save for Later</Button>
      </div>
    </div>
  )
}

export default Job