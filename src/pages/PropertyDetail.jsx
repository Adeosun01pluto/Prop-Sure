import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaDollarSign, FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdApartment, MdOutlineLandscape } from 'react-icons/md';

// Re-using the dummy data from Properties.jsx
const allProperties = [
  {
    id: 1,
    title: 'Modern Family Home',
    images: [
      'https://images.unsplash.com/photo-1570129476813-f24f0c7650f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1592595896615-b7732d847119?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1592928302599-90656a5c18c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'House',
    location: 'Beverly Hills, CA',
    price: '$1,200,000',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800, // sqft
    description: 'A beautiful modern home with spacious interiors and a lush garden. Located in a quiet, family-friendly neighborhood, it features an open-concept living area, gourmet kitchen, and a master suite with a spa-like bathroom. Expansive backyard perfect for entertaining.',
    features: ['Swimming Pool', 'Central Air', 'Hardwood Floors', 'Fireplace', 'Two-Car Garage', 'Smart Home System'],
    agent: {
      name: 'Sarah Johnson',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@propsure.com',
    }
  },
  {
    id: 2,
    title: 'Chic Downtown Apartment',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1560793134-f06b6b7722d5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1489171078255-dc88e228574c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'Apartment',
    location: 'Downtown, NYC',
    price: '$3,500/month',
    status: 'For Rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200, // sqft
    description: 'Luxury apartment with stunning city views, perfect for urban living. Features include floor-to-ceiling windows, modern kitchen with stainless steel appliances, and access to a rooftop lounge and fitness center.',
    features: ['City View', 'Gym Access', 'Doorman', 'New Appliances', 'Balcony'],
    agent: {
      name: 'Michael Chen',
      photo: 'https://randomuser.me/api/portraits/men/44.jpg',
      phone: '+1 (555) 987-6543',
      email: 'michael.chen@propsure.com',
    }
  },
  {
    id: 3,
    title: 'Spacious Suburban Villa',
    images: [
      'https://images.unsplash.com/photo-1600585154340-dacd9860b73c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1560185012-ce46700c73e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'House',
    location: 'Suburban, TX',
    price: '$450,000',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2200, // sqft
    description: 'Family-friendly home in a quiet neighborhood with great schools. Offers a large backyard, updated kitchen, and comfortable living spaces. Easy access to local parks and shopping centers.',
    features: ['Large Yard', 'New Roof', 'Updated Kitchen', 'Quiet Neighborhood'],
    agent: {
      name: 'Jessica Lee',
      photo: 'https://randomuser.me/api/portraits/women/55.jpg',
      phone: '+1 (555) 234-5678',
      email: 'jessica.lee@propsure.com',
    }
  },
  {
    id: 4,
    title: 'Oceanfront Condo',
    images: [
      'https://images.unsplash.com/photo-1580582932707-5205c5fce07e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1521783988139-89394be76e01?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'Apartment',
    location: 'Miami Beach, FL',
    price: '$2,800/month',
    status: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 800, // sqft
    description: 'One-bedroom condo with direct beach access and modern amenities. Enjoy breathtaking ocean views from your private balcony. Building amenities include a pool and gym.',
    features: ['Ocean View', 'Private Balcony', 'Community Pool', 'Gym', 'Direct Beach Access'],
    agent: {
      name: 'David Kim',
      photo: 'https://randomuser.me/api/portraits/men/78.jpg',
      phone: '+1 (555) 345-6789',
      email: 'david.kim@propsure.com',
    }
  },
  {
    id: 5,
    title: 'Prime Development Land',
    images: [
      'https://images.unsplash.com/photo-1588349279573-04e3e3b3a726?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1534067783941-51c9c23adc42?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'Land',
    location: 'Rural, NY',
    price: '$800,000',
    status: 'For Sale',
    bedrooms: null,
    bathrooms: null,
    area: null, // acres or sqft, can adjust
    description: 'Expansive land parcel with development potential, ideal for investors or building your dream custom home. Located in a serene rural setting with easy access to main roads. Zoned for residential development.',
    features: ['Development Potential', 'Rural Setting', 'Accessible by Road', 'Scenic Views'],
    agent: {
      name: 'Robert Davis',
      photo: 'https://randomuser.me/api/portraits/men/33.jpg',
      phone: '+1 (555) 456-7890',
      email: 'robert.davis@propsure.com',
    }
  },
  {
    id: 6,
    title: 'Cozy City Flat',
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1522703816654-e0b0e51336c1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'Apartment',
    location: 'London, UK',
    price: '£1,800/month',
    status: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    description: 'Charming flat in the heart of London, close to transport and amenities. Ideal for professionals seeking a vibrant city lifestyle. Features a compact kitchen and comfortable living space.',
    features: ['Central Location', 'Close to Public Transport', 'Furnished Option', 'Modern Bathroom'],
    agent: {
      name: 'Emily White',
      photo: 'https://randomuser.me/api/portraits/women/77.jpg',
      phone: '+44 (0)20 7123 4567',
      email: 'emily.white@propsure.com',
    }
  },
  {
    id: 7,
    title: 'Countryside Estate',
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1596394337289-53e70d440798?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'House',
    location: 'Upstate, NY',
    price: '$950,000',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    description: 'Luxurious estate with vast lands, perfect for privacy and tranquility. Features multiple living areas, a gourmet kitchen, and spacious bedrooms. Ideal for a large family or those seeking a peaceful retreat.',
    features: ['Private Estate', 'Large Acreage', 'Gourmet Kitchen', 'Multi-Car Garage', 'Scenic Views'],
    agent: {
      name: 'Daniel Brown',
      photo: 'https://randomuser.me/api/portraits/men/22.jpg',
      phone: '+1 (555) 567-8901',
      email: 'daniel.brown@propsure.com',
    }
  },
  {
    id: 8,
    title: 'Urban Studio Loft',
    images: [
      'https://images.unsplash.com/photo-1522703816654-e0b0e51336c1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1554995207-c18c696d3cd0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    type: 'Apartment',
    location: 'San Francisco, CA',
    price: '$2,200/month',
    status: 'For Rent',
    bedrooms: 0, // Studio
    bathrooms: 1,
    area: 500,
    description: 'Compact and modern studio loft in a vibrant city neighborhood. Perfect for singles or couples. Features an open-plan layout, compact kitchen, and easy access to public transport and nightlife.',
    features: ['Open Concept', 'Compact Kitchen', 'Pet-Friendly', 'Walk to Amenities'],
    agent: {
      name: 'Olivia Martin',
      photo: 'https://randomuser.me/api/portraits/women/11.jpg',
      phone: '+1 (555) 789-0123',
      email: 'olivia.martin@propsure.com',
    }
  },
];


const PropertyDetailPage = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // In a real app, you'd fetch data from an API here:
    // fetch(`/api/properties/${id}`)
    //   .then(res => res.json())
    //   .then(data => setProperty(data));

    // For now, find the property from our dummy data
    const foundProperty = allProperties.find((p) => p.id === parseInt(id));
    setProperty(foundProperty);
  }, [id]); // Re-run when the ID changes

  const nextImage = () => {
    if (property && property.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % property.images.length
      );
    }
  };

  const prevImage = () => {
    if (property && property.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + property.images.length) % property.images.length
      );
    }
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-700 text-2xl">
        Loading property details...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back to Properties Link */}
        <div className="mb-8">
          <Link to="/properties" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L7.293 10.414a1 1 0 010-1.414l3.999-4a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Property Details */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3">{property.title}</h1>
            <p className="text-gray-600 text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-indigo-500" /> {property.location}
            </p>
            <p className="text-5xl font-bold text-indigo-600 mb-6">{property.price}</p>

            {/* Property Gallery */}
            <div className="relative mb-8 rounded-lg overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={`Property image ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-indigo-500' : 'bg-gray-400'} hover:bg-indigo-300 transition-colors`}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Key Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Facts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-gray-700">
                <p className="flex items-center"><MdApartment className="mr-2 text-indigo-500" /> Type: <span className="font-semibold ml-1">{property.type}</span></p>
                <p className="flex items-center"><FaDollarSign className="mr-2 text-indigo-500" /> Status: <span className={`font-semibold ml-1 ${property.status === 'For Sale' ? 'text-indigo-800' : 'text-green-800'}`}>{property.status}</span></p>
                {property.bedrooms && <p className="flex items-center"><FaBed className="mr-2 text-indigo-500" /> Beds: <span className="font-semibold ml-1">{property.bedrooms}</span></p>}
                {property.bathrooms && <p className="flex items-center"><FaBath className="mr-2 text-indigo-500" /> Baths: <span className="font-semibold ml-1">{property.bathrooms}</span></p>}
                {property.area && <p className="flex items-center"><FaRulerCombined className="mr-2 text-indigo-500" /> Area: <span className="font-semibold ml-1">{property.area} sqft</span></p>}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features/Amenities */}
            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Features & Amenities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 list-none p-0 m-0 gap-y-2">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Google Map Placeholder */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Location Map</h3>
              <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center text-gray-500 text-lg">
                Google Map Placeholder
              </div>
            </div>
          </div>

          {/* Right Column: Agent & Contact Form */}
          <div className="lg:col-span-1 bg-white p-8 rounded-lg shadow-lg h-fit sticky top-28"> {/* Sticky for better UX */}
            {property.agent && (
              <div className="text-center mb-8">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500"
                />
                <h3 className="text-2xl font-bold text-gray-800">{property.agent.name}</h3>
                <p className="text-gray-600 text-sm mb-4">Listing Agent</p>
                <div className="flex justify-center space-x-4 mb-4">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                    <FaPhone className="mr-2" /> Call
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    <FaEnvelope className="mr-2" /> Email
                  </a>
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Book a Visit / Contact Agent</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Your Phone (Optional)</label>
                <input type="tel" id="phone" name="phone" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="+1 (123) 456-7890" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea id="message" name="message" rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" placeholder="I'm interested in this property..."></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;