import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaHandshake, FaGlobe } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-5xl font-extrabold text-center text-gray-800 mb-5 md:mb-12">
          About PropSure: Your Trusted Real Estate Partner
        </h1>

        {/* Mission, Vision, Values Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaBuilding className="text-indigo-600 text-6xl mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To simplify the property journey for everyone, making it transparent, efficient, and enjoyable. We connect people with their perfect homes and investments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaHandshake className="text-indigo-600 text-6xl mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be the leading real estate platform globally, recognized for our innovative technology, ethical practices, and unparalleled customer service.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaGlobe className="text-indigo-600 text-6xl mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Values</h2>
              <ul className="text-gray-700 leading-relaxed list-none p-0 m-0 space-y-2">
                <li>Integrity & Trust</li>
                <li>Customer Centricity</li>
                <li>Innovation</li>
                <li>Community Focus</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-white p-10 rounded-lg shadow-lg mb-16 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-6">Our Story: Building PropSure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PropSure was founded in 2020 by a team of real estate enthusiasts and tech innovators who shared a common frustration: the complexity and opaqueness of traditional property markets. We envisioned a platform where finding, selling, or renting a property was as easy as a few clicks.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Starting from a small office in Lagos, Nigeria, our journey has been fueled by a commitment to transparency, technology, and putting our users first. We've grown from a simple listing site to a comprehensive platform offering advanced search, expert agent connections, and seamless transaction support.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, PropSure stands as a testament to our dedication to transforming the real estate experience, empowering individuals and families to make informed decisions with confidence.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1544436214-7299a9a3f23a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="PropSure Team Office"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-indigo-600 text-white text-center rounded-lg shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Join the PropSure Family!</h2>
            <p className="text-lg md:text-xl mb-8">
              Whether you're looking for your dream home or a smart investment, PropSure is here to help.
            </p>
            <Link to="/properties" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-200 transition-colors shadow-lg">
              Explore Properties Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;