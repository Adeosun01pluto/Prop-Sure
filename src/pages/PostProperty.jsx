import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostPropertyPage = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: '',
    type: 'House', // Default type
    location: '',
    price: '',
    status: 'For Sale', // Default status
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    features: [], // Array for selected features
    images: [''], // Array for image URLs, starting with one empty input
    agentName: '',
    agentEmail: '',
    agentPhone: '',
  });

  // Common real estate features
  const availableFeatures = [
    'Swimming Pool', 'Central Air', 'Hardwood Floors', 'Fireplace',
    'Two-Car Garage', 'Smart Home System', 'City View', 'Gym Access',
    'Doorman', 'New Appliances', 'Balcony', 'Large Yard', 'New Roof',
    'Updated Kitchen', 'Quiet Neighborhood', 'Ocean View', 'Private Balcony',
    'Community Pool', 'Direct Beach Access', 'Development Potential',
    'Rural Setting', 'Accessible by Road', 'Scenic Views', 'Open Concept',
    'Compact Kitchen', 'Pet-Friendly', 'Walk to Amenities'
  ];

  // Handle input changes for text, number, select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes for features
  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          features: [...prevData.features, value],
        };
      } else {
        return {
          ...prevData,
          features: prevData.features.filter((feature) => feature !== value),
        };
      }
    });
  };

  // Handle image URL input changes (for dynamic adding of image fields)
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  // Add a new empty image URL input field
  const addImageField = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ''],
    }));
  };

  // Remove an image URL input field
  const removeImageField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // In a real application, you would send this formData to your backend API
    console.log('New Property Data:', formData);

    // Simulate API call success and redirect
    alert('Property submitted successfully!');
    navigate('/properties'); // Redirect to properties page after submission
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-5 md:mb-12">
          List Your Property
        </h1>

        <p className="text-center text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          Fill out the details below to add your property to the PropSure listings.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-8">

          {/* Property Details Section */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Property Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Property Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Beautiful Family Home with Garden"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
                <select
                  id="type"
                  name="type"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Full Address / Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 123 Main St, Anytown, State, Country"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price (e.g., $500,000 or $2,500/month)</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., $1,200,000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Listing Status</label>
                <select
                  id="status"
                  name="status"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              {/* Conditional fields based on type (optional for land) */}
              {(formData.type === 'House' || formData.type === 'Apartment' || formData.type === 'Condo' || formData.type === 'Townhouse') && (
                <>
                  <div>
                    <label htmlFor="bedrooms" className="block text-gray-700 text-sm font-bold mb-2">Bedrooms</label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., 3"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="bathrooms" className="block text-gray-700 text-sm font-bold mb-2">Bathrooms</label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., 2.5"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">Area (SqFt / SqM / Acres)</label>
                <input
                  type="text" // Can be text for unit flexibility
                  id="area"
                  name="area"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 2500 sqft or 1.5 acres"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Property Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                  placeholder="Provide a detailed description of the property, its unique selling points, and neighborhood."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Features & Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {availableFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${index}`}
                    name="features"
                    value={feature}
                    checked={formData.features.includes(feature)}
                    onChange={handleFeatureChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`feature-${index}`} className="ml-2 text-gray-700 text-base">{feature}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Images Section */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Property Images (URLs)</h2>
            <p className="text-gray-600 mb-2 md:mb-4">Provide URLs for images of your property. (In a real app, you'd upload files here.)</p>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="url"
                  id={`image-${index}`}
                  name={`image-${index}`}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  required={index === 0} // Make first image required
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="ml-3 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Add another image URL
            </button>
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-3">Your Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="agentName" className="block text-gray-700 text-sm font-bold mb-2">Your Name (Agent/Lister)</label>
                <input
                  type="text"
                  id="agentName"
                  name="agentName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Full Name"
                  value={formData.agentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="agentEmail" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                <input
                  type="email"
                  id="agentEmail"
                  name="agentEmail"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  value={formData.agentEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="agentPhone" className="block text-gray-700 text-sm font-bold mb-2">Your Phone</label>
                <input
                  type="tel"
                  id="agentPhone"
                  name="agentPhone"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+234 (XXX) XXX-XXXX"
                  value={formData.agentPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-4 rounded-md hover:bg-indigo-700 transition-colors font-semibold text-lg md:text-xl"
          >
            Post Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPropertyPage;