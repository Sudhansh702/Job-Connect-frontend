import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, isLoading }) => {
  if (isAuthenticated) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
