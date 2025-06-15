import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={property.image}
        alt={property.type}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{property.title || property.type}</h3>
        <p className="text-gray-600 mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
          {property.location}
        </p>
        <p className="text-2xl font-semibold text-indigo-600 mb-3">{property.price}</p>

        {property.bedrooms && property.bathrooms && property.area && (
          <div className="flex items-center text-gray-700 text-sm mb-4 space-x-4">
            <span className="flex items-center">
              <FaBed className="mr-1 text-gray-500" /> {property.bedrooms} Beds
            </span>
            <span className="flex items-center">
              <FaBath className="mr-1 text-gray-500" /> {property.bathrooms} Baths
            </span>
            <span className="flex items-center">
              <FaRulerCombined className="mr-1 text-gray-500" /> {property.area} sqft
            </span>
          </div>
        )}

        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            property.status === 'For Sale' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {property.status}
        </span>
        <Link
          to={`/properties/${property.id}`}
          className="block mt-4 bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;