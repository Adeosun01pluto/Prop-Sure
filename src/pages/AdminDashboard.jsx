import React, { useState, useEffect } from 'react';
import { FaHome, FaUsers, FaNewspaper, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io'; // For close button on forms

// Import initial dummy data
import initialProperties from '../data/properties';
import initialAgents from '../data/agents';
import initialBlogPosts from '../data/blogPosts';

// Helper to generate a unique ID (for frontend simulation)
const generateUniqueId = (arr) => {
  const maxId = arr.reduce((max, item) => (item && item.id > max ? item.id : max), 0);
  return maxId + 1;
};

// --- Sub-components for Admin Dashboard Sections ---

// Property Card Component
const PropertyCard = ({ property, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/400x250?text=No+Image'} alt={property.title} className="w-full h-48 object-cover" />
    <div className="p-5">
      <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{property.title}</h3>
      <p className="text-indigo-600 font-bold mb-2">{property.price}</p>
      <div className="text-gray-700 text-sm mb-4">
        <p className="flex items-center mb-1"><FaHome className="mr-2 text-gray-500" />{property.type} - {property.status}</p>
        <p className="flex items-center"><FaUsers className="mr-2 text-gray-500" />{property.location}</p>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => onEdit(property)}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors flex items-center text-sm"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(property.id)}
          className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors flex items-center text-sm"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  </div>
);

// AdminProperties Component (incorporating form and card display)
const AdminProperties = ({ properties, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [formData, setFormData] = useState({
    title: '', type: 'House', location: '', price: '', status: 'For Sale',
    bedrooms: '', bathrooms: '', area: '', description: '', features: [],
    images: [''], agentName: '', agentEmail: '', agentPhone: '',
  });

  const availableFeatures = [
    'Swimming Pool', 'Central Air', 'Hardwood Floors', 'Fireplace',
    'Two-Car Garage', 'Smart Home System', 'City View', 'Gym Access',
    'Doorman', 'New Appliances', 'Balcony', 'Large Yard', 'New Roof',
    'Updated Kitchen', 'Quiet Neighborhood', 'Ocean View', 'Private Balcony',
    'Community Pool', 'Direct Beach Access', 'Development Potential',
    'Rural Setting', 'Accessible by Road', 'Scenic Views', 'Open Concept',
    'Compact Kitchen', 'Pet-Friendly', 'Walk to Amenities'
  ];

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        ...editingProperty,
        images: editingProperty.images && editingProperty.images.length > 0 ? editingProperty.images : [''],
        features: Array.isArray(editingProperty.features) ? editingProperty.features : [],
        agentName: editingProperty.agent?.name || '',
        agentEmail: editingProperty.agent?.email || '',
        agentPhone: editingProperty.agent?.phone || '',
      });
    } else {
      setFormData({ // Reset form when not editing
        title: '', type: 'House', location: '', price: '', status: 'For Sale',
        bedrooms: '', bathrooms: '', area: '', description: '', features: [],
        images: [''], agentName: '', agentEmail: '', agentPhone: '',
      });
    }
  }, [editingProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      features: checked
        ? [...prevData.features, value]
        : prevData.features.filter((f) => f !== value),
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prevData) => ({ ...prevData, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prevData) => ({ ...prevData, images: [...prevData.images, ''] }));
  };

  const removeImageField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      ...formData,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : undefined,
      agent: {
        name: formData.agentName,
        email: formData.agentEmail,
        phone: formData.agentPhone,
      },
      dateAdded: editingProperty ? editingProperty.dateAdded : new Date().toISOString().split('T')[0],
      id: editingProperty ? editingProperty.id : generateUniqueId(properties),
    };

    // Remove temporary agent fields
    delete newProperty.agentName;
    delete newProperty.agentEmail;
    delete newProperty.agentPhone;

    if (editingProperty) {
      onUpdate(newProperty);
      setEditingProperty(null);
    } else {
      onAdd(newProperty);
      setIsAdding(false);
    }
    // Reset form after submission
    setFormData({
      title: '', type: 'House', location: '', price: '', status: 'For Sale',
      bedrooms: '', bathrooms: '', area: '', description: '', features: [],
      images: [''], agentName: '', agentEmail: '', agentPhone: '',
    });
  };

  const startEdit = (property) => {
    setIsAdding(true); // Open the form view
    setEditingProperty(property);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingProperty(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-between">
        Properties
        <button
          onClick={() => isAdding ? cancelForm() : setIsAdding(true)}
          className={`px-6 py-3 rounded-full font-semibold transition-colors flex items-center shadow-md ${
            isAdding ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAdding ? <><IoMdCloseCircle className="inline mr-2 text-xl" />Cancel</> : <><FaPlus className="inline mr-2" />Add Property</>}
        </button>
      </h2>

      {(isAdding || editingProperty) && (
        <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-10">
          <button
            onClick={cancelForm}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
            title="Close Form"
          >
            <IoMdCloseCircle />
          </button>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{editingProperty ? 'Edit Property' : 'Add New Property'}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Details Section */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Property Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Property Title</label>
                  <input type="text" id="title" name="title" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Beautiful Family Home" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
                  <select id="type" name="type" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white" value={formData.type} onChange={handleChange} required>
                    <option value="House">House</option><option value="Apartment">Apartment</option><option value="Condo">Condo</option><option value="Townhouse">Townhouse</option><option value="Land">Land</option><option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Full Address / Location</label>
                  <input type="text" id="location" name="location" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., 123 Main St, Anytown" value={formData.location} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                  <input type="text" id="price" name="price" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., $1,200,000" value={formData.price} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Listing Status</label>
                  <select id="status" name="status" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white" value={formData.status} onChange={handleChange} required>
                    <option value="For Sale">For Sale</option><option value="For Rent">For Rent</option>
                  </select>
                </div>
                {(formData.type === 'House' || formData.type === 'Apartment' || formData.type === 'Condo' || formData.type === 'Townhouse') && (
                  <>
                    <div>
                      <label htmlFor="bedrooms" className="block text-gray-700 text-sm font-bold mb-2">Bedrooms</label>
                      <input type="number" id="bedrooms" name="bedrooms" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., 3" value={formData.bedrooms} onChange={handleChange} min="0" />
                    </div>
                    <div>
                      <label htmlFor="bathrooms" className="block text-gray-700 text-sm font-bold mb-2">Bathrooms</label>
                      <input type="number" id="bathrooms" name="bathrooms" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., 2.5" step="0.5" value={formData.bathrooms} onChange={handleChange} min="0" />
                    </div>
                  </>
                )}
                <div>
                  <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">Area (SqFt / SqM / Acres)</label>
                  <input type="text" id="area" name="area" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., 2500 sqft" value={formData.area} onChange={handleChange} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Property Description</label>
                  <textarea id="description" name="description" rows="6" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" placeholder="Detailed description..." value={formData.description} onChange={handleChange} required></textarea>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Features & Amenities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" id={`prop-feature-${index}`} name="features" value={feature} checked={formData.features.includes(feature)} onChange={handleFeatureChange} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor={`prop-feature-${index}`} className="ml-2 text-gray-700 text-base">{feature}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Property Images (URLs)</h4>
              <p className="text-gray-600 mb-4 text-sm">Provide URLs for images of your property. (In a real app, you'd upload files here.)</p>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input type="url" id={`prop-image-${index}`} name={`image-${index}`} className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Image URL" value={image} onChange={(e) => handleImageChange(index, e.target.value)} required={index === 0 && formData.images.length === 1} />
                  {formData.images.length > 1 && (
                    <button type="button" onClick={() => removeImageField(index)} className="ml-3 bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addImageField} className="mt-2 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-colors text-sm">Add another image URL</button>
            </div>

            {/* Contact Information Section */}
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Agent Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="agentName" className="block text-gray-700 text-sm font-bold mb-2">Agent Name</label>
                  <input type="text" id="agentName" name="agentName" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Agent Full Name" value={formData.agentName} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="agentEmail" className="block text-gray-700 text-sm font-bold mb-2">Agent Email</label>
                  <input type="email" id="agentEmail" name="agentEmail" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="agent@email.com" value={formData.agentEmail} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="agentPhone" className="block text-gray-700 text-sm font-bold mb-2">Agent Phone</label>
                  <input type="tel" id="agentPhone" name="agentPhone" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="+234 (XXX) XXX-XXXX" value={formData.agentPhone} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-md hover:bg-indigo-700 transition-colors font-semibold text-xl shadow-lg">
              {editingProperty ? 'Update Property' : 'Add Property'}
            </button>
          </form>
        </div>
      )}

      {!isAdding && !editingProperty && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-600 py-10">No properties to display. Click "Add Property" to get started!</p>
          ) : (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} onEdit={startEdit} onDelete={onDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
};


// Agent Card Component
const AgentCard = ({ agent, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center p-5">
    <img
      src={agent.photo || 'https://via.placeholder.com/150x150?text=Agent'}
      alt={agent.name}
      className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-indigo-200 mb-4"
    />
    <h3 className="text-xl font-semibold text-gray-900 mb-1">{agent.name}</h3>
    <p className="text-indigo-600 text-sm mb-3">{agent.title}</p>
    <p className="text-gray-700 text-sm mb-2">Email: {agent.email}</p>
    <p className="text-gray-700 text-sm mb-4">Phone: {agent.phone}</p>
    <div className="flex justify-center space-x-3 mt-4">
      <button
        onClick={() => onEdit(agent)}
        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors flex items-center text-sm"
      >
        <FaEdit className="mr-1" /> Edit
      </button>
      <button
        onClick={() => onDelete(agent.id)}
        className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors flex items-center text-sm"
      >
        <FaTrash className="mr-1" /> Delete
      </button>
    </div>
  </div>
);

// AdminAgents Component
const AdminAgents = ({ agents, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);

  const [formData, setFormData] = useState({
    name: '', photo: '', title: '', specialties: '', phone: '', email: '', portfolioLink: '',
  });

  useEffect(() => {
    if (editingAgent) {
      setFormData({
        ...editingAgent,
        specialties: Array.isArray(editingAgent.specialties) ? editingAgent.specialties.join(', ') : '',
      });
    } else {
      setFormData({ name: '', photo: '', title: '', specialties: '', phone: '', email: '', portfolioLink: '', });
    }
  }, [editingAgent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAgent = {
      ...formData,
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s !== ''),
      id: editingAgent ? editingAgent.id : generateUniqueId(agents),
    };
    if (editingAgent) {
      onUpdate(newAgent);
      setEditingAgent(null);
    } else {
      onAdd(newAgent);
      setIsAdding(false);
    }
    setFormData({ name: '', photo: '', title: '', specialties: '', phone: '', email: '', portfolioLink: '', });
  };

  const startEdit = (agent) => {
    setIsAdding(true);
    setEditingAgent(agent);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingAgent(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-between">
        Agents
        <button
          onClick={() => isAdding ? cancelForm() : setIsAdding(true)}
          className={`px-6 py-3 rounded-full font-semibold transition-colors flex items-center shadow-md ${
            isAdding ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAdding ? <><IoMdCloseCircle className="inline mr-2 text-xl" />Cancel</> : <><FaPlus className="inline mr-2" />Add Agent</>}
        </button>
      </h2>

      {(isAdding || editingAgent) && (
        <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl mx-auto mb-10">
          <button
            onClick={cancelForm}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
            title="Close Form"
          >
            <IoMdCloseCircle />
          </button>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{editingAgent ? 'Edit Agent' : 'Add New Agent'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Agent Name</label>
              <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Photo URL</label>
              <input type="url" id="photo" name="photo" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.photo} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input type="text" id="title" name="title" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.title} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="specialties" className="block text-gray-700 text-sm font-bold mb-2">Specialties (comma-separated)</label>
              <input type="text" id="specialties" name="specialties" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Luxury Homes, Rentals" value={formData.specialties} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
              <input type="tel" id="phone" name="phone" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="portfolioLink" className="block text-gray-700 text-sm font-bold mb-2">Portfolio Link (Optional)</label>
              <input type="url" id="portfolioLink" name="portfolioLink" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.portfolioLink} onChange={handleChange} />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold shadow-lg">
              {editingAgent ? 'Update Agent' : 'Add Agent'}
            </button>
          </form>
        </div>
      )}

      {!isAdding && !editingAgent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-600 py-10">No agents to display. Click "Add Agent" to get started!</p>
          ) : (
            agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onEdit={startEdit} onDelete={onDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
};


// Blog Post Card Component
const BlogPostCard = ({ post, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
    <img src={post.image || 'https://via.placeholder.com/400x250?text=Blog+Image'} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-5 flex-grow flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-3">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-700 text-base mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex justify-end space-x-3 mt-auto"> {/* mt-auto pushes buttons to bottom */}
        <button
          onClick={() => onEdit(post)}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors flex items-center text-sm"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors flex items-center text-sm"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  </div>
);

// AdminBlogPosts Component
const AdminBlogPosts = ({ blogPosts, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [formData, setFormData] = useState({
    title: '', image: '', date: '', author: '', excerpt: '', content: '',
  });

  useEffect(() => {
    if (editingPost) {
      setFormData({
        ...editingPost,
      });
    } else {
      setFormData({ title: '', image: '', date: '', author: '', excerpt: '', content: '', });
    }
  }, [editingPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0], // Use current date if not provided
      id: editingPost ? editingPost.id : generateUniqueId(blogPosts),
    };
    if (editingPost) {
      onUpdate(newPost);
      setEditingPost(null);
    } else {
      onAdd(newPost);
      setIsAdding(false);
    }
    setFormData({ title: '', image: '', date: '', author: '', excerpt: '', content: '', });
  };

  const startEdit = (post) => {
    setIsAdding(true);
    setEditingPost(post);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingPost(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-between">
        Blog Posts
        <button
          onClick={() => isAdding ? cancelForm() : setIsAdding(true)}
          className={`px-6 py-3 rounded-full font-semibold transition-colors flex items-center shadow-md ${
            isAdding ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAdding ? <><IoMdCloseCircle className="inline mr-2 text-xl" />Cancel</> : <><FaPlus className="inline mr-2" />Add Post</>}
        </button>
      </h2>

      {(isAdding || editingPost) && (
        <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-10">
          <button
            onClick={cancelForm}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
            title="Close Form"
          >
            <IoMdCloseCircle />
          </button>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Post Title</label>
              <input type="text" id="title" name="title" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input type="url" id="image" name="image" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.image} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date (YYYY-MM-DD)</label>
              <input type="date" id="date" name="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.date} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
              <input type="text" id="author" name="author" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" value={formData.author} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-gray-700 text-sm font-bold mb-2">Excerpt</label>
              <textarea id="excerpt" name="excerpt" rows="3" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" value={formData.excerpt} onChange={handleChange}></textarea>
            </div>
            <div>
              <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Full Content (HTML allowed)</label>
              <textarea id="content" name="content" rows="10" className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y" placeholder="Use basic HTML for formatting (e.g., <p>, <h3>, <ul>)" value={formData.content} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors font-semibold shadow-lg">
              {editingPost ? 'Update Post' : 'Add Post'}
            </button>
          </form>
        </div>
      )}

      {!isAdding && !editingPost && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogPosts.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-600 py-10">No blog posts to display. Click "Add Post" to get started!</p>
          ) : (
            blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} onEdit={startEdit} onDelete={onDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
};


// --- Main Admin Dashboard Component ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties'); // 'properties', 'agents', 'blogPosts'

  // State for all data types, initialized from dummy data
  const [properties, setProperties] = useState(initialProperties);
  const [agents, setAgents] = useState(initialAgents);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  // --- Property Management Functions ---
  const addProperty = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
    alert('Property added successfully!');
  };
  const updateProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    );
    alert('Property updated successfully!');
  };
  const deleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      alert('Property deleted successfully!');
    }
  };

  // --- Agent Management Functions ---
  const addAgent = (newAgent) => {
    setAgents((prev) => [...prev, newAgent]);
    alert('Agent added successfully!');
  };
  const updateAgent = (updatedAgent) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
    );
    alert('Agent updated successfully!');
  };
  const deleteAgent = (id) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
      alert('Agent deleted successfully!');
    }
  };

  // --- Blog Post Management Functions ---
  const addBlogPost = (newPost) => {
    setBlogPosts((prev) => [...prev, newPost]);
    alert('Blog post added successfully!');
  };
  const updateBlogPost = (updatedPost) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    alert('Blog post updated successfully!');
  };
  const deleteBlogPost = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      alert('Blog post deleted successfully!');
    }
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-gray-900 text-white p-6 lg:min-h-screen shadow-2xl flex flex-col">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-300 tracking-wider">PropSure Admin</h1>
        <nav className="flex-grow">
          <ul>
            <li className="mb-3">
              <button
                onClick={() => setActiveTab('properties')}
                className={`w-full text-left py-4 px-6 rounded-lg transition-all duration-300 flex items-center font-medium text-lg ${
                  activeTab === 'properties' ? 'bg-indigo-700 shadow-lg text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <FaHome className="mr-4 text-2xl" /> Properties
              </button>
            </li>
            <li className="mb-3">
              <button
                onClick={() => setActiveTab('agents')}
                className={`w-full text-left py-4 px-6 rounded-lg transition-all duration-300 flex items-center font-medium text-lg ${
                  activeTab === 'agents' ? 'bg-indigo-700 shadow-lg text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <FaUsers className="mr-4 text-2xl" /> Agents
              </button>
            </li>
            <li className="mb-3">
              <button
                onClick={() => setActiveTab('blogPosts')}
                className={`w-full text-left py-4 px-6 rounded-lg transition-all duration-300 flex items-center font-medium text-lg ${
                  activeTab === 'blogPosts' ? 'bg-indigo-700 shadow-lg text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <FaNewspaper className="mr-4 text-2xl" /> Blog Posts
              </button>
            </li>
          </ul>
        </nav>
        {/* Placeholder for footer or version info */}
        <div className="mt-auto pt-6 border-t border-gray-700 text-gray-500 text-center text-sm">
          &copy; {new Date().getFullYear()} PropSure Admin
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 bg-gray-100">
        {activeTab === 'properties' && (
          <AdminProperties
            properties={properties}
            onAdd={addProperty}
            onUpdate={updateProperty}
            onDelete={deleteProperty}
          />
        )}
        {activeTab === 'agents' && (
          <AdminAgents
            agents={agents}
            onAdd={addAgent}
            onUpdate={updateAgent}
            onDelete={deleteAgent}
          />
        )}
        {activeTab === 'blogPosts' && (
          <AdminBlogPosts
            blogPosts={blogPosts}
            onAdd={addBlogPost}
            onUpdate={updateBlogPost}
            onDelete={deleteBlogPost}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;