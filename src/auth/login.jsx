import React from "react";
import { Briefcase } from 'lucide-react';
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Context } from '../main';

export default function LoginPage() {
    const { isAuthorized, setIsAuthorized } = React.useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const [logInData, setLogInData] = React.useState({
        username: '',
        password: '',
    })
    
    async function handleLogin(e) { 
        e.preventDefault();
        try {
            const { username, password } = logInData;

            if (!username || !password) {
                toast.error('Please fill all fields');
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                logInData
            });

            localStorage.setItem('token', res.data.token);
            toast.success("Logged in successfully!");
            setIsAuthorized(true)
            handleLoginSuccess();
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    const handleLoginSuccess = () => {
        const lastPath = localStorage.getItem('lastPath') || '/dashboard';
        navigate(lastPath, { replace: true });
    };

    if (isAuthorized) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 flex-col">
            <div className="text-center mt-10 flex gap-2.5 content-center items-center p-7">
                <Briefcase className="text-primary text-3xl text-blue-500" />
                <h1 className="text-center text-gray-800 text-2xl font-bold">JobConnect</h1>
            </div>
            <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-gray-600 text-lg mb-5">Welcome back</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to your account to continue</p>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1 text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Name"
                            onChange={(e) => setLogInData({ ...logInData, username: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={(e) => setLogInData({ ...logInData, password: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-5 text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Create account</Link>
                </p>
            </div>
        </div>
    );
};
