import React from 'react';
import { CarouselSize } from '@/components/carouseSpacing';
import Footer from '@/components/Footer';

export default function Hero() {
  return (
    <div>
  <div className="px-4 mt-36 md:px-8 lg:px-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-6 py-8">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold">Authentic Products, Assured Quality</h1>
          <p className="mt-4 text-gray-600">10,000+ companies in stock for immediate shipping in India. Available with short lead times. Contact us today!</p>
        </div>
        <div className="lg:w-1/2">
          <img src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/1600w/carousel/167/EC-banner-14.jpg?c=2" alt="electronic parts" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>

      {/* Product Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        {[1, 2].map((item) => (
          <div key={item} className="flex flex-col lg:flex-row items-center gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl font-semibold">Authentic Products, Assured Quality</h2>
              <p className="mt-2 text-gray-600">10,000+ companies in stock for immediate shipping in India. Available with short lead times. Contact us today!</p>
              <button className="mt-4 px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition">View Product</button>
            </div>
            <div className="lg:w-1/2">
              <img src={item === 1 ? "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/640w/carousel/170/Display_banner-14-1.jpg?c" : "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/1600w/carousel/167/EC-banner-14.jpg?c=2"} alt="electronic parts" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Featured Categories */}
      <h2 className="text-center text-2xl font-bold mt-12">Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Drone Parts</h3>
            <p className="text-gray-600">Motors, Frame, Camera, ESC</p>
            <img src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/drone-parts-1.jpg?t=1732813857" alt="drone part" className="mt-2 rounded-md" />
          </div>
        ))}
      </div>

      {/* Featured, New & Popular Products */}
      {['Featured', 'New', 'Most Popular'].map((category) => (
        <div key={category} className="mt-12">
          <h2 className="text-center text-2xl font-bold">{category} Products</h2>
          <CarouselSize/>
        </div>
      ))}

      {/* Latest News */}
      <h2 className="text-center text-2xl font-bold mt-12">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/320w/uploaded_images/humdity-sensor-thumbnail.jpg?t=1737010200" alt="news" className="w-full rounded-md" />
            <p className="text-gray-500 mt-2">Date</p>
            <p className="font-semibold">Content Heading</p>
            <p className="text-gray-600">Brief description of the article.</p>
            <p className="text-gray-500 text-sm">Published by Author</p>
          </div>
        ))}
      </div>

      {/* View All Articles */}
      <p className="text-center  text-blue-600 mt-6 cursor-pointer hover:underline">View all Articles</p>

    </div>
    <Footer />

    </div>
  
  );
}