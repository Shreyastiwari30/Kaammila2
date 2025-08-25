import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import About from './About'
import useGetAlljobs from '@/hooks/useGetAlljobs'
import Banner from './Banner'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAlljobs();
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user?.role==='Recruiter'){
      navigate('/admin/dashboard');
    }
  },[])

  return (

    
    <div className='bg-linear-to-r from-gray-800 via-blue-700 to-gray-900' >
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <Banner/>
      <LatestJobs/>
      <About/>
      <Footer/>
    </div>
  )
}

export default Home
