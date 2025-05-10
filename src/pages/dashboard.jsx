import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect, useContext } from 'react'


import JobCard from "../components/Jobcard";
import { Context } from '../main';
import axios from "axios";


const Dashboard = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  // console.log(user)
  const [yourJobsElem, setYourJobElem] = useState([])
  const [appliedJobsElem, setAppliedJobsElem] = useState([])
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/myjobs/?ID=${user._id}`,);
        if (!res || !res.data) throw new Error('Error fetching jobs');
        setYourJobElem(() =>    
          res.data.map((cur, i) => (
            <div key={i} className="min-w-[300px] max-w-xs flex-shrink-0">
              <JobCard
                key={cur._id}
                title={cur.title}
                description={cur.description}
                postedByName={cur.postedByName}
                location={cur.location}
                type={cur.type}
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
        const res2 = await axios.get(`http://localhost:5000/appliedjobs/?ID=${user._id}`,);
        if (!res2 || !res2.data) throw new Error('Error fetching jobs');
        setAppliedJobsElem(() =>
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
          {/* <p className="text-sm text-gray-600">Create and manage your Jobs</p> */}
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

        {appliedJobsElem.length > 0 ?
          <section aria-label="Your application">
            <h3 className="font-semibold text-sm mb-3">Your application:</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {appliedJobsElem}
            </div>
          </section> : ""}
        {yourJobsElem.length > 0 ?
          <section aria-label="Your jobs">
            <h3 className="font-semibold text-sm mb-3 ">Your jobs:</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {yourJobsElem}
            </div>
          </section> : ""}
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
