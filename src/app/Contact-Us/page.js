"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
 
 

export default function ContactUs( ) {
 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mt-36">
      <div className="flex justify-center">
 
         <div className="p-6 border rounded-lg shadow-md max-w-lg   space-y-4 mb-9">
        <h2 className="text-lg font-semibold">Contact Us</h2>
        <p className="text-sm text-gray-600">
          Please fill out the form below and we will revert within 24-48 hours.
        </p>
        <p className="text-sm text-gray-600">
          You can also contact us on WhatsApp or Email:
        </p>
        <p className="text-sm font-medium">
          WhatsApp:{" "}
          <a href="tel:+918655821346" className="text-blue-600">
            +91 86558 21346
          </a>
        </p>
        <p className="text-sm font-medium">
          Email:{" "}
          <a href="mailto:sales@evelta.com" className="text-blue-600">
            sales@evelta.com
          </a>
        </p>
        <p className="text-sm text-gray-600">
          If you want to know the status of an online order, please visit our{" "}
          <a href="/tracking" className="text-blue-600">
            tracking page
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name *</label>
            <div className="flex gap-2">
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email *</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <Input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              What can we help with? *
            </label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
              className="w-full text-amber-700 p-2 border rounded"
            >
              <option value="">Select an issue</option>
              <option value="order-related">Order Related Issue</option>
              <option value="payment-issue">Payment Issue</option>
              <option value="feedback">Feedback</option>
              <option value="product-question">Product Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type message here..."
              className="w-full p-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
         </div>
         <div>
 
 </div>
      </div>
    
      <Footer />
    </div>
  );
}
