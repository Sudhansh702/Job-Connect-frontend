import { useContext, useEffect } from 'react';
import { Context } from '../main'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// export default Profile;
import { useState } from "react";
import Dashboard from './dashboard';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Building2,
  Edit2,
  Check,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser, isAuthorized, setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || !user) {
      navigate('/login');
    }
  }, [isAuthorized, user]);

  // Safety check - return null while checking authorization
  if (!user || !isAuthorized) {
    return null;
  }

  const toggleEdit = () => setIsEditing(!isEditing);

  // Profile form handlers
  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function logout() {
    localStorage.removeItem('token'); 
    toast.success('You are logged out.')
    setUser(null);
    setIsAuthorized(false);
    navigate('/login');
  }
  // Render functions for tab content
  const renderProfileInfo = () => (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200">
          {user.profilePic ? (
            <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-full h-full text-gray-400" />
          )}
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-semibold text-gray-800">{user.fullName}</h2>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {user.type}
            </span>
          </div>
          <div className="mt-2 space-y-1 text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full max-w-xs"
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full max-w-xs"
                />
              ) : (
                <p>{user.location}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          {/* <button
            onClick={toggleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none"
          >
            {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            <span>{isEditing ? "Save" : "Edit"}</span>
          </button> */}
          
           <button onClick={logout} className="w-full mt-1 bg-gray-200 text-gray-800 rounded-lg p-2 font-medium hover:bg-gray-300 transition">
             Logout
           </button>
        </div>
      </div>


      {/* Posted jobs */}

    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-6 px-4">
        {renderProfileInfo()}
        <Dashboard />
      </main>
    </div>
  );
};

export default ProfilePage;


