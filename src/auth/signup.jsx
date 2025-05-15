import { useState, useContext } from 'react';
import { Briefcase } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../main';

export default function Register() {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    location: '',
    type: 'Job Seeker'
  });


  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password, email, fullName, location} = userData
    if (!username || !password || !email || !fullName || !location) {
      toast.error('fill all details')
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        userData
      })
      toast.success(res.data.message)
      localStorage.setItem('token', res.data.token);
      setIsAuthorized(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  }
  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 flex-col p-7">
      <div className="text-center mt-10 flex gap-2.5 content-center items-center p-7">
        <Briefcase className="text-primary text-3xl text-blue-500" />
        <h1 className="text-center text-gray-800 text-2xl font-bold">JobConnect</h1>
      </div>
      <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">

        <h2 className="text-xl text-center mb-2">Create an account</h2>
        <p className="text-center text-gray-600 mb-6">Join JobConnect to find your next opportunity</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="johndoe"
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Account Type</span>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Job Seeker"
                  checked={userData.type === "Job Seeker"}
                  onChange={(e) => setUserData({ ...userData, type: e.target.value })}
                  className="mr-2"
                />
                Job Seeker
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Recruiter"
                  checked={userData.type === "Recruiter"}
                  onChange={(e) => setUserData({ ...userData, type: e.target.value })}
                  className="mr-2"
                />
                Recruiter
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Delhi , India"
              onChange={(e) => setUserData({ ...userData, location: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
