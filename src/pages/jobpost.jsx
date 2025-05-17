import { useState, useContext } from 'react';
import { Context } from '../main';
import { toast } from 'react-toastify'
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function JobPost() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  if (!user || user.type !== 'Recruiter') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-xl font-semibold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-4">Only recruiters can post jobs.</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </a>
      </div>
    );
  }

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    type: '',
    country: '',
    city: '',
    location: '',
    salary: '',
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    // console.log('Posting job:', newJob);
    const token = localStorage.getItem('token')
    if (!token || !newJob.title || !newJob.description || !newJob.type || !newJob.country || !newJob.location || !newJob.city) {
      return toast.error('fill all details')
    }
    if (newJob.title.length < 3 || newJob.description.length < 10) {
      toast.error('title/description too small')
      return
    }
    if (newJob.title.length > 30 || newJob.description.length > 500) {
      toast.error('title/description too big')
      return
    }
    try {
      // console.log(newJob)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/postjob`,
        newJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res)
      toast.success('Job Posted Successfully')
      setNewJob({
        title: '',
        description: '',
        type: '',
        country: '',
        city: '',
        location: '',
        salary: '',
        tags: [],
      })
      navigate('/profile');
    } catch (error) {
      toast.error('Error posting Job')
      console.log(error)
    }
  };

  const [tag, setTag] = useState("")
  const handleTag = (e) => {
    const { value } = e.target;
    setTag(value);
  };

  function addTag(e) {
    e.preventDefault()
    if (tag) {
      setNewJob((newJob) => ({
        ...newJob,
        tags: [...new Set([...newJob.tags, tag])],
      }));
      setTag("")
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleChange}
            className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleChange}
            rows={4}
            className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              name="type"
              value={newJob.type}
              onChange={handleChange}
              className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salary (Monthly)</label>
            <input
              type="number"
              name="salary"
              value={newJob.salary}
              onChange={handleChange}
              className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={newJob.country}
              onChange={handleChange}
              className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={newJob.city}
              onChange={handleChange}
              className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Office Location / Remote</label>
          <input
            type="text"
            name="location"
            value={newJob.location}
            onChange={handleChange}
            className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Remote / Onsite / Hybrid"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className='flex  items-center w-full gap-5 '>
            <input
              type="text"
              name="tag"
              value={tag}
              onChange={handleTag}
              className="pl-5 mt-1 w-80 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. JavaScript"
            />
            <button
              onClick={addTag}
              className=" bg-blue-500 h-8 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200 text-sm text-nowrap"
            >
              Add Tag
            </button>
          </div>
        </div >

        <div className="flex flex-wrap gap-1 mb-1">
          {newJob.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-block bg-blue-200 text-blue-700 text-[10px] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={handleJobPost}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
