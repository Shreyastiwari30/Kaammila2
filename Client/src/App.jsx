import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/auth/login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import Jobs from './components/Jobs'
import About from './components/About'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Gpt from './components/Gpt'
import CreateJob from './components/admin/CreateJob'
import RecruiterDashboard from './components/admin/RecruiterDashboard'
import Applicants from './components/admin/Applicants'
import ViewJobs from './components/admin/ViewJobs'
const approuter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/gpt',
    element:<Gpt/>
  },
  {
    path:'/admin/dashboard',
    element:<RecruiterDashboard/>
  },
  {
    path:'/admin/createjob',
    element:<CreateJob/>
  },
  {
    path:'/admin/applicants',
    element:<Applicants/>
  },
  {
    path:'/admin/viewjobs',
    element: <ViewJobs/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={approuter}/>
      <Toaster/>
    </>
  )
}

export default App
