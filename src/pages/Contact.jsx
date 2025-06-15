import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-5 md:mb-12">
          Get in Touch with PropSure
        </h1>

        <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          Have questions, feedback, or need assistance? Our team is ready to help! Reach out to us through the form below or using our contact details.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Contact Details</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-indigo-600 text-3xl mr-4" />
                <div>
                  <p className="font-semibold">Our Office Address:</p>
                  <p>123 Real Estate St,</p>
                  <p>Cityville, Country</p>
                  <p>Lagos, Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-indigo-600 text-3xl mr-4" />
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p>+1 (234) 567-8900</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-indigo-600 text-3xl mr-4" />
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>info@propsure.com</p>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Us on the Map</h3>
              <div className="bg-blue-200 h-64 w-full rounded-lg flex items-center justify-center text-gray-500 text-lg">
                Google Map Placeholder
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Subject of your message" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea id="message" name="message" rows="7" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" placeholder="Type your message here..."></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold text-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;