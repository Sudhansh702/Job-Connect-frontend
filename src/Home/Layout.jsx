import React, { useEffect, useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Header from '../navbar/header';
import { Context } from '../main';

const Layout = () => {
  const { isAuthorized ,user} = useContext(Context);
  const location = useLocation();
  
  useEffect(() => {
    if (isAuthorized) {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location, isAuthorized]);

  if (!isAuthorized) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className='h-dvh'>
      <Header />

      <main className="flex-1 fixed overflow-y-auto p-4 w-dvw h-10/12"><Outlet /></main>
    </div>
  );
};

export default Layout;
