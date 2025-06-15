import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto text-center px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-indigo-400">PropSure</h3>
            <p className="text-sm mt-1 text-gray-300">Find Your Next Home with Confidence.</p>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaLinkedin />
            </a>
          </div>

          <div className="text-gray-300 text-sm">
            <p>123 Real Estate St, Cityville, Country</p>
            <p>Email: info@propsure.com</p>
            <p>Phone: +1 (234) 567-8900</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6 text-gray-400 text-sm">
          <p>&copy; {currentYear} PropSure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;