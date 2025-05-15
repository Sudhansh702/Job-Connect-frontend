import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom';


import JobCard from "../components/Jobcard";
import { Context } from '../main';
import axios from "axios";


const Dashboard = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  // console.log(user)
  const [jobElem, setJobElem] = useState([])
  // const [appliedJobsElem, setAppliedJobsElem] = useState([])
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (user.type === "Recruiter") {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/myjobs/?ID=${user._id}`,);
          if (!res || !res.data) throw new Error('Error fetching jobs');
          setJobElem(() =>
            res.data.map((cur, i) => (
              <div key={i} className="min-w-[300px] max-w-xs flex-shrink-0">
                <JobCard
                  key={cur._id}
                  title={cur.title}
                  description={cur.description}
                  postedByName={cur.postedByName}
                  type={cur.type}
                  location={cur.location}
                  city={cur.city}
                  salary={cur.salary}
                  tags={cur.tags}
                  jobPostedOn={cur.jobPostedOn}
                  jobId={cur._id}
                  canNotApply={user._id === cur.postedBy}
                />
              </div>
            ))
          );
        } else {
          const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/appliedjobs/?ID=${user._id}`,);
          if (!res2 || !res2.data) throw new Error('Error fetching jobs');
          setJobElem(() =>
            res2.data.map((cur, i) => (
              <div key={i} className="min-w-[300px] max-w-xs flex-shrink-0 ">
                <JobCard
                  key={cur._id}
                  title={cur.title}
                  postedByName={cur.postedByName}
                  description={cur.description}
                  location={cur.location}
                  type={cur.type}
                  city={cur.city}
                  salary={cur.salary}
                  tags={cur.tags}
                  jobPostedOn={cur.jobPostedOn}
                  applied={true}
                  jobId={cur._id}
                  approved={cur.approved}
                />
              </div>
            ))
          );
        }

      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchJobs();
  }, [user])

  return (
    <div className="bg-[#f8fafc] text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto p-2">
        <header className="mb-4">
          <h1 className="font-semibold text-base md:text-lg">Dashboard</h1>
        </header>
        {/*
        <section className="flex flex-col sm:flex-row gap-4 mb-6">
          <InfoCard
            title="Active Applications"
            count="1"
            status="0 in review, 1 pending"
            icon="fas fa-file-alt"
            iconColor="text-blue-600"
            bgColor="bg-blue-200"
            statusColor="text-green-600"
          />

          <InfoCard
            title="Interviews Scheduled"
            count="0"
            icon="fas fa-calendar-check"
            iconColor="text-green-400"
            bgColor="bg-green-200"
          />

          <InfoCard
            title="Saved Jobs"
            count="0"
            icon="far fa-heart"
            iconColor="text-purple-400"
            bgColor="bg-purple-200"
          />
        </section>
*/}

        {user.type === 'Job Seeker' ?
          <section aria-label="Your application">
            <h3 className="font-semibold text-sm mb-3">Manage your applications:</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {jobElem.length >0 ? jobElem :
                <div className="flex items-center justify-center min-w-[300px] max-w-xs flex-shrink-0">
                  <div className="bg-white rounded-lg p-4 shadow-sm w-full">
                    <p className="text-gray-500 text-center">Start applying to jobs to see them here.</p>
                    <p className="text-gray-500 text-center">Check out the <Link to="/search" className="text-blue-500 underline">job listings</Link>.</p>
                  </div>
                </div>
              }
            </div>
          </section> : 
          <section aria-label="Your jobs">
            <h3 className="font-semibold text-sm mb-3 ">Manage your jobs:</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {jobElem.length >0 ? jobElem :
                <div className="flex items-center justify-center min-w-[300px] max-w-xs flex-shrink-0">
                  <div className="bg-white rounded-lg p-4 shadow-sm w-full">
                    <p className="text-gray-500 text-center">Start posting jobs to see them here.</p>
                    <p className="text-gray-500 text-center">Check out the <Link to="/post-job" className="text-blue-500 underline">job listings</Link>.</p>
                  </div>
                </div>
              }
            </div>
          </section> }
      </div>
    </div>
  );
};

const InfoCard = ({ title, count, status, icon, iconColor, bgColor, statusColor }) => (
  <div className="flex-1 bg-white rounded-lg p-4 relative shadow-sm min-w-[200px] flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <p className="font-bold text-xl leading-none">{count}</p>
      {status && <p className={`text-xs mt-1 ${statusColor}`}><i className="fas fa-arrow-up mr-1"></i>{status}</p>}
    </div>
    <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center ${iconColor}`}>
      <i className={`${icon} fa-lg`}></i>
    </div>
  </div>
);

export default Dashboard;
