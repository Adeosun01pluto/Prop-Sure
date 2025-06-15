import React from 'react';
import AgentCard from '../components/AgentCard';

// Dummy Data for Agents
const agents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Sales Agent',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialties: ['Luxury Homes', 'Waterfront Properties', 'Investment'],
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@propsure.com',
    portfolioLink: '#', // Placeholder link
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Rental Specialist',
    photo: 'https://randomuser.me/api/portraits/men/44.jpg',
    specialties: ['Apartments', 'Downtown Rentals', 'First-Time Renters'],
    phone: '+1 (555) 987-6543',
    email: 'michael.chen@propsure.com',
    portfolioLink: '#',
  },
  {
    id: 3,
    name: 'Jessica Lee',
    title: 'Residential Expert',
    photo: 'https://randomuser.me/api/portraits/women/55.jpg',
    specialties: ['Suburban Homes', 'Family Relocation', 'Buying & Selling'],
    phone: '+1 (555) 234-5678',
    email: 'jessica.lee@propsure.com',
    portfolioLink: '#',
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Coastal Property Agent',
    photo: 'https://randomuser.me/api/portraits/men/78.jpg',
    specialties: ['Beachfront Condos', 'Vacation Rentals', 'Coastal Homes'],
    phone: '+1 (555) 345-6789',
    email: 'david.kim@propsure.com',
    portfolioLink: '#',
  },
  {
    id: 5,
    name: 'Emily White',
    title: 'International Properties',
    photo: 'https://randomuser.me/api/portraits/women/77.jpg',
    specialties: ['UK Market', 'Expat Relocation', 'Luxury Rentals'],
    phone: '+44 (0)20 7123 4567',
    email: 'emily.white@propsure.com',
    portfolioLink: '#',
  },
  {
    id: 6,
    name: 'Robert Davis',
    title: 'Land & Development',
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    specialties: ['Land Sales', 'Commercial Development', 'Rural Properties'],
    phone: '+1 (555) 456-7890',
    email: 'robert.davis@propsure.com',
    portfolioLink: '#',
  },
];

const AgentsPage = () => {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-5 md:mb-12">
          Meet Our Expert Agents
        </h1>

        <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          Our team of dedicated and experienced real estate agents is here to guide you through every step of your property journey.
          Find the perfect specialist for your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;