import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const BlogPostCard = ({ post }) => {
  // Format the date for display
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
          {post.title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-1" /> {formattedDate}
          </span>
          <span className="flex items-center">
            <FaUser className="mr-1" /> {post.author}
          </span>
        </div>
        <p className="text-gray-700 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.id}`}
          className="inline-block mt-auto bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors self-start"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;