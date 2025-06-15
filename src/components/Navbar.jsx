import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Define common NavLink classes for desktop
  const desktopNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-300 border-b-2 border-indigo-300 pb-1 transition-all duration-200'
      : 'text-white hover:text-indigo-300 transition-colors duration-200';

  // Define classes for the "Post Property" button on desktop
  const desktopPostPropertyClass = ({ isActive }) =>
    isActive
      ? 'bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg'
      : 'bg-indigo-500 text-white px-5 py-2 rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-md';

  // Define common NavLink classes for mobile dropdown
  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? 'block py-2 px-4 text-indigo-300 bg-gray-700 rounded-md transition-colors'
      : 'block py-2 px-4 text-white hover:bg-gray-700 rounded-md transition-colors';

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-extrabold text-white hover:text-gray-200 transition-colors" onClick={closeMenu}>
          <FaHome className="mr-3 text-indigo-400 text-3xl" />
          PropSure
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={desktopNavLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/properties" className={desktopNavLinkClass} onClick={closeMenu}>
            Properties
          </NavLink>
          <NavLink to="/agents" className={desktopNavLinkClass} onClick={closeMenu}>
            Agents
          </NavLink>
          <NavLink to="/about" className={desktopNavLinkClass} onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/blog" className={desktopNavLinkClass} onClick={closeMenu}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={desktopNavLinkClass} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/post-property" className={desktopPostPropertyClass} onClick={closeMenu}>
            Post Property
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 p-2 rounded-md">
            {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 py-3' : 'max-h-0 opacity-0'
        } bg-gray-800 border-t border-gray-700`}
      >
        <div className="flex flex-col space-y-2 px-4">
          <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/properties" className={mobileNavLinkClass} onClick={closeMenu}>
            Properties
          </NavLink>
          <NavLink to="/agents" className={mobileNavLinkClass} onClick={closeMenu}>
            Agents
          </NavLink>
          <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/blog" className={mobileNavLinkClass} onClick={closeMenu}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink
            to="/post-property"
            className="block bg-indigo-600 text-white px-5 py-2 mt-3 rounded-full hover:bg-indigo-700 transition-colors text-center text-lg shadow-md"
            onClick={closeMenu}
          >
            Post Property
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;