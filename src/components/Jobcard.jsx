import { Link } from "react-router-dom";
import axios from "axios";

const JobCard = ({
  jobId,
  city,
  canNotApply,
  title,
  postedByName,
  location,
  type,
  salary,
  tags = [],
  description,
  jobPostedOn,
  applied = false,
  approved,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <article className="mb-4 max-w-full bg-white rounded-lg p-4 shadow-md flex flex-col justify-between transition hover:shadow-lg" aria-label={`Job listing for ${title}`}>
      <div className="flex gap-4 mb-3 overflow-auto max-w-full">
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 shrink-0">
          <i className="fas fa-building fa-lg"></i>
        </div>
        <div className="flex-1 max-w-full">
          <h4 className="font-semibold text-sm leading-tight mb-1">{title}</h4>
          <p className={`text-xs ${canNotApply ? 'text-green-600' : 'text-gray-600'} mb-1`}>
            by: {canNotApply ? 'you' : postedByName}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
            <span className="flex items-center gap-1">
              <i className="fas fa-map-marker-alt text-xs"></i> {location}
            </span>
            <span>•</span>
            <span>{type}</span>
            <span>•</span>
            <span>{city}</span>
            {salary && (
              <>
                <span>•</span>
                <span>₹{salary}</span>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex overflow-hidden max-w-full mb-2">
            <div className="truncate flex gap-1">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-700 line-clamp-1 overflow">{description}</p>
        </div>
      </div>
      {/* Approved Badge */}
      {approved && (
        <div className="text-xs text-green-600 font-semibold mb-2">
          <i className="fas fa-check-circle"></i> Approved
        </div>
      )}
      {/* links */}
      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <i className="far fa-clock"></i> Posted {formatDate(jobPostedOn)}
        </span>
        {applied ? (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this job?')) {
                axios.delete(`http://localhost:5000/deleteapplication/${jobId}`, {
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
            className="bg-red-600 border hover:bg-red-700  rounded-md px-3 py-1 transition text-white"
          >
            Delete Application
          </button>) :
          <Link
            to={canNotApply ? `/managejob/${jobId}` : `/job/${jobId}`}
            className="text-blue-600 border border-blue-600 rounded-md px-3 py-1 hover:bg-blue-50 transition"
          >
            {canNotApply ? "Manage" : "Apply Now"}
          </Link>
        }
      </div>
    </article>
  );
};

export default JobCard;


// Removed inline styles and moved them to a CSS class