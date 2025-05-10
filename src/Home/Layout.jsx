import React, { useEffect, useState,useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';


import { Briefcase } from 'lucide-react';

import Sidebar from '../navbar/SideBar';
import BottomNav from '../navbar/BottomNav';
import { Context } from '../main'; 

const Layout = () => {
    const { isAuthorized ,user} = useContext(Context);

    if (!isAuthorized) {
      return <Navigate to={"/login"} />;
    }
    
    const [isPortrait, setIsPortrait] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setIsPortrait(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='h-dvh'>
            <header className='bg-white border-b-2 border-gray-300 flex place-content-between  w-full h-1/12'>
                <div className="text-center flex gap-2.5 content-center items-center p-5">
                    <Briefcase className="text-blue-500 w-8 h-8" />
                    <h1 className="text-center text-gray-800 text-3xl font-bold">JobMatch</h1>
                </div>
                <div className='flex items-center text-gray-600 text-lg font-medium p-5'>
                    <h3>{user?user.username:'name'}</h3>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden ">
                {!isPortrait && (
                    <>
                        <Sidebar />
                        <main className="w-5/6 fixed overflow-y-auto right-0 bottom-0 h-11/12"><Outlet /></main>
                    </>
                )}
            </div>

            {isPortrait && (
                <>
                    <main className="flex-1 fixed overflow-y-auto p-4 w-dvw h-10/12"><Outlet /></main>
                    <BottomNav />
                </>
            )}
        </div>
    );
};

export default Layout;
