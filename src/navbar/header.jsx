import { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../main';

const Navbar = () => {
  const { user } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, setState] = useState(false);
  // Close on outside click
  useEffect(() => {
    setState(state => !state);
    const handleClickOutside = (e) => {
      if (!e.target.closest('#navLinks') && !e.target.closest('#hamburger')) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-900 text-white shadow-md sticky top-0 z-10 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold tracking-wide cursor-pointer select-none">
        Job<span className="text-yellow-400">Connect</span>
      </Link>

      {/* Desktop Nav */}
      <div
        id="navLinks"
        className="hidden md:flex gap-6 font-semibold transition-colors duration-300"
      >
        <Link to="/" className="hover:text-yellow-400 relative group">
          Home
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>

        <Link to="/search" className="hover:text-yellow-400 relative group">
          Search
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>
          
        {user?.type === 'Recruiter' && <Link to="/post-job" className="hover:text-yellow-400 relative group">
          Post Job
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>}

        {!user?.type ?
        <Link to="/login" className="hover:text-yellow-400 relative group">
          Log In
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>:          
        <Link to="/profile" className="hover:text-yellow-400 relative group">
          Profile
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>}
      </div>

      {/* Hamburger */}
      <div
        id="hamburger"
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Menu"
      >
        <div
          className={`w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''
            }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 w-64 h-[calc(100vh-64px)] bg-indigo-900 text-white p-6 flex flex-col gap-4 shadow-lg transform transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>
        <Link to="/search" className="hover:text-yellow-400">
          Search
        </Link>
        {user?.type === 'Recruiter' && <Link to="/post-job" className="hover:text-yellow-400">
          Post Job
        </Link>}
        {!user?.type ?
        <Link to="/login" className="hover:text-yellow-400">
          Log In
        </Link>:
        <Link to="/profile" className="hover:text-yellow-400">
          Profile
        </Link>}
      </div>
    </nav>
  );
};

export default Navbar;
