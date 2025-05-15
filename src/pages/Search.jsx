import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios'
import { toast } from 'react-toastify'

import JobCard from '../components/Jobcard'
import { Context } from '../main';
import { useEffect, useState, useContext } from 'react'

export default function Search() {

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [jobsElem, setJobsElem] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`, {
          params: { userId: user._id }
        })
        // console.log(res.data)
        const jobs = res.data
        // if(!jobs) return 
        setJobsElem(jobsElem => ([...jobs.map((curr) => (
          <JobCard
            key={curr._id}
            jobId={curr._id}
            title={curr.title}
            type={curr.type}
            description={curr.description}
            category={curr.category}
            country={curr.country}
            city={curr.city}
            tags={curr.tags}
            location={curr.location}
            salary={curr.salary}
            jobPostedOn={curr.jobPostedOn}
            postedByName={curr.postedByName}
            canNotApply={user._id === curr.postedBy}
          />
        ))]))
      } catch (error) {
        toast.error('Error fetching Jobs')
        console.log(error)
      }
    }
    fetchJobs()
  }, [user])


  function handleSubmit(e) {
    e.preventDefault();
    const keywords = document.getElementById('keywords').value;
    const location = document.getElementById('location').value;

    async function searchJobs() {
      try {
        const res = await axios.get('${import.meta.env.VITE_API_URL}/api/jobs/', {
          params: { keywords, location, userId: user._id }
        });
        console.log(res.data);
        const jobs = res.data;
        setJobsElem(jobs.map((curr) => (
          <JobCard
            jobId={curr._id}
            key={curr._id}
            title={curr.title}
            type={curr.type}
            description={curr.description}
            category={curr.category}
            country={curr.country}
            city={curr.city}
            tags={curr.tags}
            location={curr.location}
            salary={curr.salary}
            jobPostedOn={curr.jobPostedOn}
            postedByName={curr.postedByName}
            canNotApply={user._id === curr.postedBy}
          />
        )));
      } catch (error) {
        toast.error('Error searching Jobs');
        console.log(error);
      }
    }

    searchJobs();
  }

  return (
    <div className='p-5 bg-gray-50 '>
      <section className="bg-white rounded-lg p-4 mb-6 shadow-sm" aria-label="Find Your Next Opportunity">
        <h2 className="font-semibold text-sm mb-3">Find Your Next Opportunity</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:items-end">
          <InputField id="keywords" label="Keywords" placeholder="Job title, skills, or company" icon="fas fa-th-list" />
          <InputField id="location" label="Location" placeholder="City, state, or remote" icon="fas fa-map-marker-alt" />
          <button
            type="submit"

            className="h-10 bg-blue-600 text-white text-xs font-semibold rounded-md px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-search"></i> Search Jobs
          </button>
        </form>
      </section>
      {jobsElem}
    </div>
  )
}

const InputField = ({ id, label, placeholder, icon }) => (
  <div className="flex-1 sm:w-64">
    <label htmlFor={id} className="block text-xs text-gray-700 mb-1 font-normal">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="h-10 w-full border border-gray-200 rounded-md py-2 pl-8 text-xs text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <i className={`${icon} absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs pointer-events-none`} aria-hidden="true"></i>
    </div>
  </div>
);
