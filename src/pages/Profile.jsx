import { toast } from 'react-toastify';
import {Navigate } from "react-router-dom";
import { useContext } from 'react';
import {Context} from '../main'

const Profile = () => {

  const {isAuthorized,setIsAuthorized ,user,setUser}  = useContext(Context)

  function logout() {
    localStorage.removeItem('token'); 
    toast.success('You are loged out.')
    setUser(null)
    setIsAuthorized(false)
  } 
  if(!isAuthorized || !user){
    return <Navigate path="/login"/>
  }

  return (
    <div className="min-h-screen  flex justify-center p-4">
      <div className="bg-white shadow-x rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
            {user?.username?.charAt(0) || 'JC'}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span>Username</span>
            <span className="font-medium text-gray-800">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Full Name</span>
            <span className="font-medium text-gray-800">{user.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span>Title</span>
            <span className="font-medium text-gray-800">{user.professionalTitle}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {/* <button className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
        Edit Profile
      </button> */}
          <button onClick={logout} className="w-full bg-gray-200 text-gray-800 rounded-lg py-2 font-medium hover:bg-gray-300 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
