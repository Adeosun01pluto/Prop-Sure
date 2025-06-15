import React from 'react';
import { FaPhone, FaEnvelope, FaLink } from 'react-icons/fa'; // FaLink for portfolio/website

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center">
      <img
        src={agent.photo}
        alt={agent.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500"
      />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{agent.name}</h3>
      <p className="text-indigo-600 font-semibold mb-3">{agent.title || 'Real Estate Agent'}</p>
      
      {agent.specialties && agent.specialties.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-1">Specialties:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {agent.specialties.map((specialty, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <a 
          href={`tel:${agent.phone}`} 
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm"
        >
          <FaPhone className="mr-2" /> Call
        </a>
        <a 
          href={`mailto:${agent.email}`} 
          className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
        >
          <FaEnvelope className="mr-2" /> Email
        </a>
        {agent.portfolioLink && (
          <a 
            href={agent.portfolioLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <FaLink className="mr-2" /> Portfolio
          </a>
        )}
      </div>
    </div>
  );
};

export default AgentCard;