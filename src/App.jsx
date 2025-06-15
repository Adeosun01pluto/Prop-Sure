import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all your placeholder pages
import HomePage from './pages/Home';
import PropertiesPage from './pages/Properties';
import PropertyDetailPage from './pages/PropertyDetail';
import AgentsPage from './pages/Agents';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetail';
import PostPropertyPage from './pages/PostProperty';
import SinglePostPage from './pages/SinglePost'; // Import SinglePostPage



const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50"> {/* Overall background */}
        <Navbar />
        <main className="flex-grow"> {/* Main content area takes available space */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} /> {/* Dynamic route for property details */}
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* <Route path="/blog/:id" element={<BlogDetailPage />} /> Dynamic route for blog details */}
            <Route path='/blog/:id' element={<SinglePostPage />} /> {/* Individual Blog Post Page */}
            <Route path="/post-property" element={<PostPropertyPage />} />
            {/* Add a catch-all route for 404 if desired later */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;