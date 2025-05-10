import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManageJob = () => {
  // for post edit
  const [isEditing, setIsEditing] = useState(false);
  const [editJob, setEditJob] = useState({
    title: '',
    description: '',
    type: '',
    salary: '',
    country: '',
    city: '',
    location: '',
    tags: [],
  });
  const [editTag, setEditTag] = useState('');
  // till here

  const { jobId } = useParams();

  const [jobDetails, setJobDetails] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job details and applicants (replace with your API endpoints)
    const fetchJobData = async () => {
      try {
        const jobResponse = await axios.get(`http://localhost:5000/api/job/?jobId=${jobId}`)
        const jobData = jobResponse.data;
        setJobDetails(jobData);
        // console.log(jobData);

        const applicantsResponse = await axios.get(`http://localhost:5000/applicants/?jobId=${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const applicantsData = await applicantsResponse.data;
        setApplicants(applicantsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching job data:', error);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [isEditing]);

  const handleApproveApplicant = async (applicationId) => {
    try {
      await axios.post(
        `http://localhost:5000/applicants/${applicationId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === applicationId ? { ...applicant, approved: true } : applicant
        )
      );
    } catch (error) {
      console.error('Error approving applicant:', error);
    }
  };

  // for job edit
  const handleEditJob = () => {
    if (!jobDetails) return;
    setEditJob({
      title: jobDetails.title,
      description: jobDetails.description,
      type: jobDetails.type,
      salary: jobDetails.salary,
      country: jobDetails.country,
      city: jobDetails.city,
      location: jobDetails.location,
      tags: jobDetails.tags || [],
    });
    setIsEditing(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTagChange = (e) => setEditTag(e.target.value);

  const addEditTag = () => {
    if (editTag.trim()) {
      setEditJob((prev) => ({ ...prev, tags: [...prev.tags, editTag.trim()] }));
      setEditTag('');
    }
  };

  // till here

  if (loading) {
    return <div>Loading...</div>;
  }



  // return statement is here
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Job</h1>

      {jobDetails && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{jobDetails.title}</h1>
          <p className="text-gray-700 mb-4">{jobDetails.description}</p>
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p><strong>Type:</strong> {jobDetails.type}</p>
            <p><strong>Salary:</strong> {jobDetails.salary}</p>
            <p><strong>Location:</strong> {jobDetails.city} ({jobDetails.location})</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {jobDetails.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={handleEditJob}
            className="bg-blue-600 mt-5 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Edit Job
          </button>
          <button
            onClick={()=> {
              if (window.confirm('Are you sure you want to delete this job?')) {
                axios.delete(`http://localhost:5000/api/deletejob/${jobId}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                })
                .then(() => {
                  alert('Job deleted successfully');
                  window.location.href = '/';
                })
                .catch((error) => {
                  console.error('Error deleting job:', error);
                });
              }
            }}
            className="bg-red-600 mt-5 ml-2 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete Job
          </button>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mb-4">Applicants</h3>

      {applicants.length > 0 ? (
        <ul className="space-y-4">
          {applicants.map((application) => (
            <li
              key={application._id}
              className="bg-white rounded-md shadow-sm p-4 border border-gray-100"
            >
              <p className="text-sm text-gray-800 font-medium">Name: {application.name}</p>
              <p className="text-sm text-gray-600 mb-2">Email: {application.email}</p>
              <p className="text-sm text-gray-600 mb-2">Cover Letter: {application.coverLetter}</p>
              {application.resume && (
                <img 
                  src={application.resume} 
                  alt="Resume" 
                  className="max-w-full h-auto mb-2 border border-gray-200 rounded"
                />
              )}
              <div className="mt-3">
                {!application.approved ? (
                  <button
                    onClick={() => handleApproveApplicant(application._id)}
                    className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition text-sm"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="inline-block text-green-600 font-medium text-sm">
                    Approved
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No applicants for this job yet.</p>
      )}

      {/* this is the job edit model */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full p-8 rounded-2xl shadow-lg relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Job</h2>
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await axios.put(`http://localhost:5000/api/editjob/${jobId}`, editJob, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  });
                  setJobDetails(response.data);
                  setIsEditing(false);
                } catch (error) {
                  console.error('Error updating job:', error);
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input type="text" name="title" value={editJob.title} onChange={handleEditChange} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={editJob.description} onChange={handleEditChange} rows={4} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Type</label>
                  <select name="type" value={editJob.type} onChange={handleEditChange} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" required>
                    <option value="">Select Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary (Monthly)</label>
                  <input type="number" name="salary" value={editJob.salary} onChange={handleEditChange} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input type="text" name="country" value={editJob.country} onChange={handleEditChange} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" name="city" value={editJob.city} onChange={handleEditChange} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Office Location / Remote</label>
                <input type="text" name="location" value={editJob.location} onChange={handleEditChange} className="pl-5 mt-1 w-full rounded-md border border-gray-300 shadow-sm" placeholder="e.g. Remote / Onsite / Hybrid" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className='flex items-center w-full gap-5'>
                  <input type="text" name="tag" value={editTag} onChange={handleEditTagChange} className="pl-5 mt-1 w-80 rounded-md border border-gray-300 shadow-sm" placeholder="e.g. JavaScript" />
                  <button type="button" onClick={addEditTag} className="bg-blue-500 h-8 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-sm">Add Tag</button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-1">
                {editJob.tags.map((tag, i) => (
                  <span key={i} className="inline-block bg-blue-200 text-blue-700 text-[10px] px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      {/* till here */}
    </div>
  );
};

export default ManageJob;