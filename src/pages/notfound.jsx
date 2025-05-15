import React from "react";
import image from "../../public/notfound.svg";
export default function NotFound(){
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-center">
              <img src={image} alt="not fount" className="w-2xs"/>
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