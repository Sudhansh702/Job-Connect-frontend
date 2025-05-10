import { toast } from 'react-toastify'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { Context } from '../main'

const JobDetails = () => {
  const { user } = useContext(Context);

  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: user?.fullName || "", email: user?.email || "", cover: "", resume: null });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchjob() {
      try {
        const res = await axios.get(`http://localhost:5000/api/job/?jobId=${jobId}`)
        if (!res || !res.data) throw new Error('Error fetching jobs');
        setJob(res.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchjob()
  }, [jobId]);

  // Apply for the job
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.resume && !['image/png', 'image/jpeg', 'image/jpg'].includes(form.resume.type)) {
      setMessage("Invalid resume format. Only png, jpeg, jpg are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('cover', form.cover);
    formData.append('resume', form.resume); // resume is a File object
    formData.append('jobId', jobId);
    formData.append('employerID', job.postedBy);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/applyjob',  // Added /api prefix
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res || !res.data) throw new Error('Error submitting application');
      toast.success("Application Submitted");
      console.log("Application Submitted:", form);
      setMessage("Application submitted successfully!");
      setForm({ name: "", email: "", cover: "", resume: null });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error applying for the job');
      console.error('Error:', err.response?.data || err.message);
    }
  };

  if (!job) return <p className="p-4">Loading job details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Location:</strong> {job.city} ({job.location})</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Apply for this Job</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-md px-4 py-2"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-md px-4 py-2"
          required
        />

        <textarea
          placeholder="Cover Letter"
          value={form.cover}
          onChange={(e) => setForm({ ...form, cover: e.target.value })}
          className="w-full border rounded-md px-4 py-2 h-24"
        />

        <div>
          <label className="block mb-1 text-sm font-medium">Upload Resume (PDF, DOC, DOCX only)</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
            className="w-full border rounded-md px-4 py-2"
            required
          />
        </div>

        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobDetails;
