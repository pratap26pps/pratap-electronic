"use client";

import React from 'react';
import Footer from '@/components/Footer';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

const page = () => {
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="mt-24">
<div className=" min-h-screen flex flex-col items-center py-10">
      <div className="max-w-3xl text-center space-y-4 p-6  shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-blue-600">Quick Order</h1>
        <p className="text-gray-600">If you would like to add multiple parts quickly to your cart, you can enter SKUs directly into rows on this page or upload a CSV file.</p>
        <p className="text-gray-600">To upload SKUs in a CSV file to your cart:</p>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Create a 2-column CSV with “sku” and “qty” headings (lower case) on the first row.</li>
          <li>Click on Upload CSV below.</li>
          <li>Navigate to and open your CSV file, new rows will appear below. Optionally remove the first blank row.</li>
          <li>Click on Add all items to your cart.</li>
        </ol>
        <p className="text-gray-600">Each row will be added to the cart sequentially.</p>
      </div>

      <div className="mt-6 p-6 border rounded-lg shadow-md w-96 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type Item SKU</label>
          <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter SKU" className="mt-1" />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <Button onClick={decreaseQuantity} className="px-3 bg-gray-300 text-gray-700 hover:bg-gray-400">-</Button>
          <span className="px-4 text-lg font-semibold">{quantity}</span>
          <Button onClick={increaseQuantity} className="px-3 bg-gray-300 text-gray-700 hover:bg-gray-400">+</Button>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Adding to basket</Button>
        
        <div className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline">
          <input type="file" id="csvUpload" className="hidden" />
          <label htmlFor="csvUpload" className="flex items-center gap-2">
            <Upload size={16} /> Upload CSV
          </label>
        </div>
        
        <Button variant="outline" className="w-full border border-blue-600 text-blue-600 hover:bg-blue-100">View Cart</Button>
      </div>

    </div>
    <Footer className="mt-10" />

    </div>
    
  );
};

export default page;
