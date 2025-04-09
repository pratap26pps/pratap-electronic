

import React from 'react';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <div>
  <div className=" min-h-screen mt-24  flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">RFQ</h1>
      <div className="w-full max-w-3xl  p-6 shadow-lg rounded-lg">
        <p className="text-gray-700 mb-4 text-sm md:text-base">
          Please fill out the details of your requirement below and we will revert
          with our quotation within 48 hours. Kindly provide accurate manufacturer
          part number (MPN) or reference link/image to facilitate a quick response.
          Alternatively, you can also share your queries through WhatsApp or email.
        </p>
        <div className="flex flex-col md:flex-row justify-between text-gray-700 border-b pb-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">WhatsApp:</span>
            <span className="text-blue-600 ">+91 4322 5467 32</span>
          </div>
          <div className="flex items-center gap-2  mt-2 md:mt-0">
            <span className="font-semibold">Email:</span>
            <span className="text-blue-600">email@gmail.com</span>
          </div>
        </div>
        
        <form className="space-y-4">
          <div>
            <h2 className="font-semibold text-gray-700">Product List</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm md:text-base">
              <h3 className="font-medium">MPN or Name</h3>
              <h3 className="font-medium">Quantity</h3>
            </div>
            <ol className="space-y-2 mt-2">
              {[...Array(4)].map((_, index) => (
                <li key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input type="text" className="border p-2 rounded w-full" placeholder="Enter MPN" />
                  <input type="text" className="border p-2 rounded w-full" placeholder="Enter Quantity" />
                </li>
              ))}
            </ol>
          </div>
          
          <p className="text-gray-600 text-sm md:text-base">For more products, please upload a file (CSV or XLS)</p>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">File Upload</label>
            <input type="file" className="mt-2 border p-2 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Full Name <sup className="text-red-500">*</sup></label>
              <div className="flex flex-col md:flex-row gap-2 mt-2">
                <input type="text" placeholder="First Name" className="border p-2 rounded w-full" />
                <input type="text" placeholder="Last Name" className="border p-2 rounded w-full" />
              </div>
            </div>
            <div>


              <label className="font-medium text-gray-700">Email <sup className="text-red-500">*</sup></label>
              <input type="email" placeholder="email@gmail.com" className="border p-2 rounded w-full mt-2" />
            </div>
            <div>
              <label className="font-medium text-gray-700">Phone <sup className="text-red-500">*</sup></label>
              <input type="number" placeholder="Phone Number" className="border p-2 rounded w-full mt-2" />
            </div>
            <div>
              <label className="font-medium text-gray-700">Company Name <sup className="text-red-500">*</sup></label>
              <input type="text" placeholder="Company Name" className="border p-2 rounded w-full mt-2" />
            </div>
            <div className="md:col-span-2">
              <label className="font-medium text-gray-700">Message</label>
              <textarea className="border p-2 rounded w-full mt-2" rows="4" placeholder="Enter your message"></textarea>
            </div>
          </div>

          <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
    <Footer className="mt-10" />

    </div>
  
  );
};

export default page;



 