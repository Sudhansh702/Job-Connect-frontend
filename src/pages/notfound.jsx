import React from "react";

export default function NotFound(){
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
};