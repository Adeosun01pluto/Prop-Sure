import { FaSearch, FaHome, FaLandmark, FaDollarSign } from 'react-icons/fa';
import { FaUserGroup } from "react-icons/fa6";
import { MdApartment, MdOutlineLandscape } from 'react-icons/md';
import { Link } from 'react-router-dom';

// Dummy data for featured properties
const featuredProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1570129476813-f24f0c7650f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'House',
    location: 'Beverly Hills, CA',
    price: '$1,200,000',
    status: 'For Sale',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Apartment',
    location: 'Downtown, NYC',
    price: '$3,500/month',
    status: 'For Rent',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-dacd9860b73c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'House',
    location: 'Suburban, TX',
    price: '$450,000',
    status: 'For Sale',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1580582932707-5205c5fce07e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'Apartment',
    location: 'Miami Beach, FL',
    price: '$2,800/month',
    status: 'For Rent',
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen-75 flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ff51f8162846?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
        <div className="relative z-10 text-center p-4">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 animate-fadeInUp">Find Your Next Home with Confidence.</h1>
          <p className="text-lg md:text-xl mb-8">Discover properties for rent, sale, and exclusive land listings.</p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto backdrop-blur-sm bg-opacity-80">
            <form className="text-black grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Location (e.g., New York, London)"
                className="p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select className="p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
              <select className="p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Price Range</option>
                <option value="50000-200000">$50,000 - $200,000</option>
                <option value="200001-500000">$200,001 - $500,000</option>
                <option value="500001-1000000">$500,001 - $1,000,000</option>
                <option value="1000001+">$1,000,001+</option>
              </select>
              <button
                type="submit"
                className="col-span-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <FaSearch className="mr-2" /> Search Properties
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Filter Buttons */}
      <section className="container mx-auto my-5 md:my-8 px-4">
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full hover:bg-indigo-200 transition-colors shadow-sm flex items-center">
            <FaDollarSign className="mr-2" /> For Sale
          </button>
          <button className="bg-green-100 text-green-800 px-6 py-3 rounded-full hover:bg-green-200 transition-colors shadow-sm flex items-center">
            <FaHome className="mr-2" /> For Rent
          </button>
          <button className="bg-purple-100 text-purple-800 px-6 py-3 rounded-full hover:bg-purple-200 transition-colors shadow-sm flex items-center">
            <MdOutlineLandscape className="mr-2" /> Land
          </button>
          <button className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full hover:bg-yellow-200 transition-colors shadow-sm flex items-center">
            <MdApartment className="mr-2" /> Luxury Homes
          </button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-6 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <img src={property.image} alt={property.type} className="w-full h-48 object-cover" />
                <div className="p-3 md:p-5">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">{property.type} - {property.location}</h3>
                  <p className="text-gray-700 text-md md:text-lg mb-3 font-semibold">{property.price}</p>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      property.status === 'For Sale' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {property.status}
                  </span>
                  <Link
                    to={`/properties/${property.id}`}
                    className="block mt-4 bg-indigo-500 text-white text-center py-2 rounded-md hover:bg-indigo-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/properties" className="inline-block bg-gray-800 text-white px-8 py-3 rounded-md text-md md:text-lg font-semibold hover:bg-gray-700 transition-colors">
              Browse All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us + Testimonials */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">Why Choose PropSure?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaSearch className="text-indigo-500 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Extensive Listings</h3>
              <p className="text-gray-700">Browse a wide variety of homes, apartments, and land for sale or rent.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaUserGroup className="text-indigo-500 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Expert Agents</h3>
              <p className="text-gray-700">Connect with experienced local agents ready to assist you.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaLandmark className="text-indigo-500 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Seamless Process</h3>
              <p className="text-gray-700">From Browse to closing, we make your journey smooth and confident.</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md italic text-gray-700">
              <p className="mb-4">"PropSure made finding our dream home incredibly easy. The listings were accurate, and their agents were highly professional. Highly recommended!"</p>
              <p className="font-bold text-gray-800">- Jane Doe, Happy Homeowner</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md italic text-gray-700">
              <p className="mb-4">"As a first-time renter, I was nervous, but PropSure guided me through every step. Their platform is intuitive and reliable."</p>
              <p className="font-bold text-gray-800">- John Smith, Satisfied Renter</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to browse listings */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-lg md:text-xl mb-8">Start your property search with PropSure today and find exactly what you're looking for.</p>
          <Link to="/properties" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-200 transition-colors shadow-lg">
            Start Your Search
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;