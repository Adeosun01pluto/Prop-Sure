import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { FaSearch, FaBed, FaBath, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { MdApartment, MdOutlineLandscape } from 'react-icons/md';

// Dummy Data for Properties - This would typically come from an API
const allProperties = [
  {
    id: 1,
    title: 'Modern Family Home',
    image: 'https://images.unsplash.com/photo-1570129476813-f24f0c7650f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'House',
    location: 'Beverly Hills, CA',
    price: '$1,200,000',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    description: 'A beautiful modern home with spacious interiors and a lush garden.',
  },
  {
    id: 2,
    title: 'Chic Downtown Apartment',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Apartment',
    location: 'Downtown, NYC',
    price: '$3,500/month',
    status: 'For Rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description: 'Luxury apartment with stunning city views, perfect for urban living.',
  },
  {
    id: 3,
    title: 'Spacious Suburban Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-dacd9860b73c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'House',
    location: 'Suburban, TX',
    price: '$450,000',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2200,
    description: 'Family-friendly home in a quiet neighborhood with great schools.',
  },
  {
    id: 4,
    title: 'Oceanfront Condo',
    image: 'https://images.unsplash.com/photo-1580582932707-5205c5fce07e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Apartment',
    location: 'Miami Beach, FL',
    price: '$2,800/month',
    status: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    description: 'One-bedroom condo with direct beach access and modern amenities.',
  },
  {
    id: 5,
    title: 'Prime Development Land',
    image: 'https://images.unsplash.com/photo-1588349279573-04e3e3b3a726?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Land',
    location: 'Rural, NY',
    price: '$800,000',
    status: 'For Sale',
    description: 'Expansive land parcel with development potential, ideal for investors.',
  },
  {
    id: 6,
    title: 'Cozy City Flat',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Apartment',
    location: 'London, UK',
    price: '£1,800/month',
    status: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    description: 'Charming flat in the heart of London, close to transport and amenities.',
  },
  {
    id: 7,
    title: 'Countryside Estate',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'House',
    location: 'Upstate, NY',
    price: '$950,000',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    description: 'Luxurious estate with vast lands, perfect for privacy and tranquility.',
  },
  {
    id: 8,
    title: 'Urban Studio Loft',
    image: 'https://images.unsplash.com/photo-1522703816654-e0b0e51336c1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Apartment',
    location: 'San Francisco, CA',
    price: '$2,200/month',
    status: 'For Rent',
    bedrooms: 0, // Studio
    bathrooms: 1,
    area: 500,
    description: 'Compact and modern studio loft in a vibrant city neighborhood.',
  },
];

const PropertiesPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    status: '', // 'For Sale' or 'For Rent'
  });
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [visibleProperties, setVisibleProperties] = useState(6); // Number of properties to show initially

  useEffect(() => {
    applyFilters();
  }, [filters]); // Re-run filtering when filters change

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let tempProperties = [...allProperties];

    // Location filter
    if (filters.location) {
      tempProperties = tempProperties.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Type filter
    if (filters.type) {
      tempProperties = tempProperties.filter((property) =>
        property.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Status filter (For Sale/For Rent)
    if (filters.status) {
        tempProperties = tempProperties.filter((property) =>
          property.status.toLowerCase() === filters.status.toLowerCase()
        );
      }

    // Price range filter
    if (filters.minPrice || filters.maxPrice) {
      tempProperties = tempProperties.filter((property) => {
        const priceNum = parseFloat(property.price.replace(/[^0-9.]/g, '')); // Extract number from price string
        const isForSale = property.status === 'For Sale';

        if (isForSale) {
            const min = parseFloat(filters.minPrice);
            const max = parseFloat(filters.maxPrice);

            if (filters.minPrice && priceNum < min) return false;
            if (filters.maxPrice && priceNum > max) return false;
        } else { // For Rent
            // For simplicity, we're not implementing min/max for rent price here,
            // as it might involve different currency/period parsing.
            // You can extend this logic if needed.
            return true; // Include all rentals if no specific price range is set for rentals
        }
        return true;
      });
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      tempProperties = tempProperties.filter(
        (property) => property.bedrooms && property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      tempProperties = tempProperties.filter(
        (property) => property.bathrooms && property.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    setFilteredProperties(tempProperties);
    setVisibleProperties(6); // Reset visible properties when filters change
  };

  const handleLoadMore = () => {
    setVisibleProperties((prevCount) => prevCount + 6); // Load 6 more properties
  };

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-5 md:mb-12">
          Explore Our Properties
        </h1>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-6">Filter Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g., New York, London"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
              <div className="relative">
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-10"
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  {/* Add more types as needed */}
                </select>
                <MdApartment className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Status (For Sale / For Rent) */}
            <div>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-10"
                >
                  <option value="">All Statuses</option>
                  <option value="for sale">For Sale</option>
                  <option value="for rent">For Rent</option>
                </select>
                <FaDollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Min Price */}
            <div>
              <label htmlFor="minPrice" className="block text-gray-700 text-sm font-bold mb-2">Min Price (Sale)</label>
              <div className="relative">
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  placeholder="Min $"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                />
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Max Price */}
            <div>
              <label htmlFor="maxPrice" className="block text-gray-700 text-sm font-bold mb-2">Max Price (Sale)</label>
              <div className="relative">
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  placeholder="Max $"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                />
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-gray-700 text-sm font-bold mb-2">Min Beds</label>
              <div className="relative">
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-10"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
                <FaBed className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-gray-700 text-sm font-bold mb-2">Min Baths</label>
              <div className="relative">
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white pr-10"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
                <FaBath className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

             {/* Clear Filters Button */}
             <div className="flex items-end">
                <button
                    onClick={() => setFilters({
                        location: '',
                        type: '',
                        minPrice: '',
                        maxPrice: '',
                        bedrooms: '',
                        bathrooms: '',
                        status: '',
                    })}
                    className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                    Clear Filters
                </button>
            </div>
          </div>
        </div>

        {/* Property Listings Grid */}
        {filteredProperties.length === 0 ? (
          <p className="text-center text-xl text-gray-600 mt-10">No properties found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.slice(0, visibleProperties).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleProperties < filteredProperties.length && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;