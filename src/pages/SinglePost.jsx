import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

// Re-using the dummy data for blog posts (copy from Blog.jsx to ensure it's available here too)
const blogPosts = [
  {
    id: 1,
    title: '5 Tips for First-Time Homebuyers in Lagos',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca90409a80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB4MjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-03-15',
    author: 'PropSure Team',
    excerpt: 'Navigating the real estate market as a first-time homebuyer can be daunting. Here are five essential tips to help you get started on your journey to homeownership in Lagos.',
    content: `
      <p class="mb-4 text-lg">Buying your first home is a significant milestone, especially in a vibrant city like Lagos. The market can be competitive, but with the right approach, you can find your dream property.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">1. Understand Your Budget and Get Pre-Approved</h3>
      <p class="mb-4 text-lg">Before you even start looking, know how much you can truly afford. This involves not just the property price, but also closing costs, taxes, and potential renovations. Getting pre-approved for a mortgage gives you a clear budget and shows sellers you're a serious buyer.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">2. Research Neighborhoods Thoroughly</h3>
      <p class="mb-4 text-lg">Lagos is diverse! Each neighborhood has its own unique character, amenities, and price points. Consider factors like proximity to work, schools, markets, transportation, and security. Spend time in potential areas at different times of day.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">3. Work with a Reputable Real Estate Agent</h3>
      <p class="mb-4 text-lg">An experienced local agent can be your best asset. They have in-depth market knowledge, access to listings, and can guide you through negotiations and paperwork. Choose someone who understands your needs and communicates effectively.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">4. Don't Skip the Inspection</h3>
      <p class="mb-4 text-lg">A professional home inspection is non-negotiable. It can uncover hidden issues that might cost you a lot down the line. Even if a property looks perfect, an inspection provides peace of mind and leverage for negotiation.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">5. Be Patient and Flexible</h3>
      <p class="mb-4 text-lg">The homebuying process can take time. Don't rush into a decision. Be prepared for potential setbacks and be flexible with your criteria. Sometimes, your "perfect" home might be slightly different than what you initially imagined.</p>
      <p class="mt-6 italic text-lg">At PropSure, we're committed to making your homebuying journey smooth and successful. Browse our listings and connect with our expert agents today!</p>
    `,
  },
  {
    id: 2,
    title: 'The Rise of Smart Homes: Integrating Tech in Property',
    image: 'https://images.unsplash.com/photo-1550953939-2c70032ac340?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-02-28',
    author: 'InnovateHub',
    excerpt: 'Smart home technology is rapidly transforming the real estate landscape, offering convenience, security, and energy efficiency. Discover the latest trends and what to look for.',
    content: `
      <p class="mb-4 text-lg">Smart home technology is no longer a futuristic concept; it's a rapidly growing segment of the real estate market. From automated lighting to integrated security systems, these innovations are enhancing comfort, convenience, and efficiency.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Energy Efficiency and Cost Savings</h3>
      <p class="mb-4 text-lg">Smart thermostats, automated blinds, and energy monitoring systems can significantly reduce utility bills. Homeowners can control their energy consumption remotely, optimizing heating and cooling based on occupancy and weather conditions.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Enhanced Security</h3>
      <p class="mb-4 text-lg">Smart security systems offer features like remote monitoring, motion sensors, smart locks, and video doorbells. These technologies provide peace of mind, allowing residents to keep an eye on their property from anywhere in the world.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Convenience and Comfort</h3>
      <p class="mb-4 text-lg">Imagine waking up to your lights slowly brightening, your coffee brewing, and your favorite music playing. Smart home integration allows for personalized routines, voice-controlled assistants, and seamless management of entertainment systems.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Increased Property Value</h3>
      <p class="mb-4 text-lg">Homes equipped with modern smart technology often have a higher appeal to potential buyers, especially tech-savvy millennials and Gen Z. Integrating these features can make your property stand out in a competitive market.</p>
      <p class="mt-6 italic text-lg">PropSure is constantly featuring properties that embrace the future of living. Explore our listings to find smart homes that offer the ultimate in modern convenience.</p>
    `,
  },
  {
    id: 3,
    title: 'Understanding Property Valuation: What Drives Market Prices?',
    image: 'https://images.unsplash.com/photo-1517596009899-7096738379ba?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-01-20',
    author: 'Market Analyst',
    excerpt: 'Property valuation is a complex process influenced by numerous factors, from location to market demand. Demystify what truly drives real estate prices.',
    content: `
      <p class="mb-4 text-lg">Understanding how properties are valued is crucial for both buyers and sellers. It's not just about the size of the house; many factors contribute to a property's market price.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Location, Location, Location</h3>
      <p class="mb-4 text-lg">This is perhaps the most significant factor. Proximity to good schools, public transport, business districts, amenities, and overall neighborhood desirability heavily influences value.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Property Condition and Features</h3>
      <p class="mb-4 text-lg">The age, condition, size, and features of a property are paramount. Recent renovations, modern appliances, energy efficiency, number of bedrooms/bathrooms, and even the layout all play a role.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Market Demand and Supply</h3>
      <p class="mb-4 text-lg">Basic economics apply to real estate. In areas with high demand and low supply, prices tend to rise. Conversely, an oversupply of similar properties can drive prices down.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Economic Indicators</h3>
      <p class="mb-4 text-lg">Interest rates, inflation, employment rates, and overall economic stability can significantly impact the housing market. Lower interest rates, for example, often stimulate buyer activity.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Comparable Sales (Comps)</h3>
      <p class="mb-4 text-lg">Real estate professionals often use "comps" – recently sold properties in the same area with similar characteristics – as a primary tool for valuation. This provides a realistic benchmark.</p>
      <p class="mt-6 italic text-lg">PropSure provides market insights to help you make informed decisions. Connect with our agents for personalized valuation advice.</p>
    `,
  },
  {
    id: 4,
    title: 'The Benefits of Renting vs. Buying: Which is Right for You?',
    image: 'https://images.unsplash.com/photo-1489171078255-dc88e228574c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-04-01',
    author: 'Financial Advisor',
    excerpt: 'Deciding whether to rent or buy is a major financial decision. We break down the pros and cons to help you choose the best path for your lifestyle and goals.',
    content: `
      <p class="mb-4 text-lg">The rent vs. buy debate is a classic one, with valid arguments for both sides. The "right" choice depends heavily on your personal financial situation, lifestyle, and long-term goals.</p>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Benefits of Renting:</h3>
      <ul class="list-disc pl-5 mb-4 text-lg space-y-2">
        <li><strong>Flexibility:</strong> Easier to move, ideal for those who might relocate for work or personal reasons.</li>
        <li><strong>Lower Upfront Costs:</strong> Typically only requires a security deposit and first month's rent, compared to a down payment, closing costs, etc.</li>
        <li><strong>Predictable Monthly Costs:</strong> Rent is usually fixed, and maintenance costs are handled by the landlord.</li>
        <li><strong>Less Responsibility:</strong> No worries about property taxes, insurance, repairs, or property upkeep.</li>
      </ul>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Benefits of Buying:</h3>
      <ul class="list-disc pl-5 mb-4 text-lg space-y-2">
        <li><strong>Building Equity:</strong> Your mortgage payments contribute to your ownership stake, building wealth over time.</li>
        <li><strong>Potential for Appreciation:</strong> Property values generally increase over the long term, offering a return on investment.</li>
        <li><strong>Tax Benefits:</strong> Homeowners can often deduct mortgage interest and property taxes.</li>
        <li><strong>Stability & Freedom:</strong> No landlord, freedom to renovate, and a sense of permanence and belonging.</li>
      </ul>
      <h3 class="text-3xl font-bold text-gray-800 mb-3">Factors to Consider:</h3>
      <ul class="list-disc pl-5 mb-4 text-lg space-y-2">
        <li><strong>Length of Stay:</strong> If you plan to stay in one place for less than 5 years, renting might be more cost-effective.</li>
        <li><strong>Financial Health:</strong> Assess your savings, credit score, and income stability.</li>
        <li><strong>Market Conditions:</strong> A hot market might make buying more challenging or expensive.</li>
        <li><strong>Lifestyle:</strong> Do you want the responsibilities of homeownership or the freedom of renting?</li>
      </ul>
      <p class="mt-6 italic text-lg">Whether you decide to rent or buy, PropSure has a wide range of listings to suit your needs. Contact our experts to discuss your options!</p>
    `,
  },
];


const SinglePostPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch data from an API here:
    // fetch(`/api/blogposts/${id}`)
    //   .then(res => res.json())
    //   .then(data => setPost(data));

    // For now, find the post from our dummy data
    const foundPost = blogPosts.find((p) => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]); // Re-run when the ID changes

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-700 text-2xl">
        Loading blog post...
      </div>
    );
  }

  // Format the date for display
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L7.293 10.414a1 1 0 010-1.414l3.999-4a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Blog Post Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 text-base mb-8 space-x-6">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-500" /> {formattedDate}
            </span>
            <span className="flex items-center">
              <FaUser className="mr-2 text-indigo-500" /> {post.author}
            </span>
          </div>

          {/* Render HTML content safely */}
          <div
            className="prose max-w-none text-gray-700 text-lg leading-relaxed blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;