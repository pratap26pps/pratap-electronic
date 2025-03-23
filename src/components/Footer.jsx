import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Information */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            {/* Brief company description */}
            Robu.in is India's largest online robotics and DIY components store, offering a wide range of products for makers and engineers.
          </p>
        </div>

        {/* Product Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Product Categories</h2>
          <ul>
            <li>
            <Link href="/product-category/drone-parts" className="text-gray-400 hover:text-white">
               Drone Parts
            </Link>
            </li>
            <li>
              <Link href="/product-category/dc-motors" className="text-gray-400 hover:text-white">
                DC Motors
              </Link>
            </li>
            {/* Add more categories as needed */}
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Support</h2>
          <ul>
            <li>
              <Link href="/support/contact-us" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/support/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
            </li>
            {/* Add more support links as needed */}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/robu.in" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Facebook SVG icon */}
              </svg>
            </a>
            <a href="https://twitter.com/robu_in" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Twitter SVG icon */}
              </svg>
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Robu.in. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
