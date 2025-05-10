import { Link } from 'react-router-dom';
import { Briefcase, Search, SquarePlus , User ,HeartPlus} from 'lucide-react';

const BottomNav = () => (
    <nav className="fixed place-content-evenly flex bottom-0 left-0 w-full py-4 border-t-2 border-gray-300 bg-white">
        <Link 
            to='/'
            className="rounded m-1.5 flex flex-col items-center text-gray-700"
        >
            <Briefcase className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
            <h3 className="text-sm font-medium">Dashboard</h3>
        </Link >
        <Link 
            to='/jobpost'
            className="rounded m-1.5 flex flex-col items-center text-gray-700"
        >
            <SquarePlus className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
            <h3 className="text-sm font-medium">Post Job</h3>
        </Link >
        <Link 
            to='/search'
            className="rounded m-1.5 flex flex-col items-center text-gray-700"
        >
            <Search className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
            <h3 className="text-sm font-medium">Search</h3>
        </Link >
        {/* <Link 
            to='/saved'
            className="rounded m-1.5 flex flex-col items-center text-gray-700"
        >
            <HeartPlus className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
            <h3 className="text-sm font-medium">Saved</h3>
        </Link > */}
        <Link 
            to='/profile'
            className="rounded m-1.5 flex flex-col items-center text-gray-700"
        >
            <User className="w-6 h-6 mb-1 text-blue-500 md:mb-0" />
            <h3 className="text-sm font-medium">Profile</h3>
        </Link >
    </nav>
);

export default BottomNav;
