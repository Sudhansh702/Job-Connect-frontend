import { Link } from 'react-router-dom';
import { Briefcase, Search, SquarePlus, User, HeartPlus } from 'lucide-react';

function Sidebar() {
    
    return (
        <nav className="fixed flex left-0 py-4 border-gray-300 w-1/6 h-11/12  border-r-2 flex-col place-content-start">
            <Link
                to='/'
                className="rounded m-1.5 flex text-gray-700 items-center gap-2 pl-4 py-2 hover:bg-gray-100 transition-all"
            >
                <Briefcase className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
                <h3 className="text-sm font-medium">Dashboard</h3>
            </Link >
            <Link
                to='/jobpost'
                className="rounded m-1.5 flex text-gray-700 items-center gap-2 pl-4 py-2 hover:bg-gray-100 transition-all"
            >
                <SquarePlus className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
                <h3 className="text-sm font-medium">Post Job</h3>
            </Link >
            <Link
                to='/Search'
                className="rounded m-1.5 flex text-gray-700 items-center gap-2 pl-4 py-2 hover:bg-gray-100 transition-all"
            >
                <Search className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
                <h3 className="text-sm font-medium">Search</h3>
            </Link >
            {/* <Link
                to='/saved'
                className="rounded m-1.5 flex text-gray-700 items-center gap-2 pl-4 py-2 hover:bg-gray-100 transition-all"
            >
                <HeartPlus className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
                <h3 className="text-sm font-medium">Saved</h3>
            </Link > */}
            <Link
                to='/profile'
                className="rounded m-1.5 flex text-gray-700 items-center gap-2 pl-4 py-2 hover:bg-gray-100 transition-all"
            >
                <User className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
                <h3 className="text-sm font-medium">Profile</h3>
            </Link >
        </nav>
    );
}
export default Sidebar;