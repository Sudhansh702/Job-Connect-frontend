import { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
// componentes
import LoginPage from './auth/login'
import Signup from './auth/signup'
import NotFound from './pages/notfound'
import Layout from './Home/Layout'
import JobPost from './pages/jobpost'
import Search from './pages/Search'
import Saved from './pages/saved'
import Profile from './pages/Profile'
import JobDetails from './pages/JobDetails'
import ManageJob from './pages/managejob'
import Home from './pages/home';

import { Context } from './main';

function App() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        setIsAuthorized(true);
      } catch (err) {
        setUser(null);
        setIsAuthorized(false);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Home />} />

        {/* Private Routes */}
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="search" element={<Search />} />  
          <Route path="post-job" element={<JobPost />} />
          <Route path="saved" element={<Saved />} />
          <Route path="profile" element={<Profile />} />
          <Route path="job/:jobId" element={<JobDetails />} />
          <Route path="managejob/:jobId" element={<ManageJob />} />
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
