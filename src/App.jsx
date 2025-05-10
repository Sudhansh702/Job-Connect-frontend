import { useState,useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
// componentes
import LoginPage from './auth/login'
import Signup from './auth/signup'
import NotFound from './pages/notfound'
import Layout from './Home/Layout'
import Dashboard from './pages/dashboard'
import JobPost from './pages/jobpost'
import Search from './pages/Search' 
import Saved from './pages/saved' 
import Profile from './pages/Profile'
import JobDetails from './pages/JobDetails'
import ManageJob from './pages/managejob'

import { Context } from './main';

function App() {
  const {isAuthorized,setIsAuthorized ,user , setUser} = useContext(Context);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/getuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        setIsAuthorized(true)
        
      } catch (err) {
        setUser(null)
        setIsAuthorized(false)
        toast.error('Failed to fetch user.');
        console.log(err)
      }
    };

    if(token)fetchUser();
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
          <Route path="/"  element={<Layout />}>
            <Route index  element={<Dashboard />} />
            <Route path="jobpost"  element={<JobPost />} />
            <Route path="search"  element={<Search  />} />
            <Route path="saved"  element={<Saved  />} />
            <Route path="profile"  element={<Profile  />} />
            <Route path="job/:jobId"  element={<JobDetails  />} />
            <Route path="managejob/:jobId"  element={<ManageJob  />} />
          </Route>
        {/* <Route element={<PivateRoute />}>
        </Route> */}

        {/* Catch-All Route */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
