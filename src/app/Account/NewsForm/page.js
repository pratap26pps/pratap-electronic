"use client"
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const NewsForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    date: '',
    heading: '',
    description: '',
    Author: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/blog', formData);
      toast.success("News posted successfully!");
      setFormData({ image: '', date: '', heading: '', description: '', Author: '' });
    } catch (error) {
      console.log(error);
      toast.error("Failed to post news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8  rounded-2xl shadow-xl mt-36">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Post a News Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter Image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="e.g., 26 April 2025"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="News headline"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter news description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Author</label>
          <input
            type="text"
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            placeholder="Author's name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className=" flex gap-3">
         <Link href='/Account/profile'>
         <button
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition duration-300 disabled:bg-blue-300"
        >
          Back
          </button>
            </Link>
  
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition duration-300 disabled:bg-blue-300"
          >
            {loading ? "Posting..." : "Post News"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewsForm;
