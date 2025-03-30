"use client";

import { useState } from "react";
import Link from "next/link";
export default function ProfileUpdateForm() {
  const [formData, setFormData] = useState({
    firstName: "Pankaj",
    lastName: "Singh",
    company: "Evelta",
    phone: "8252590019",
    email: "pankajpatna10321@gmail.com",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-xl mt-36">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">First Name <span className="text-red-500">*</span></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="input  border p-2 w-full" />
          </div>
          <div>
            <label className="block text-gray-600">Last Name <span className="text-red-500">*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="input border p-2 w-full" />
          </div>
        </div>
        <div>
          <label className="block text-gray-600">Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} className="input border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-600">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-600">Email Address <span className="text-red-500">*</span></label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input border p-2 w-full" />
        </div>
        <div>
          <label className="block text-gray-600">Current Password</label>
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="input border p-2 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">New Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input border p-2 w-full" />
          </div>
          <div>
            <label className="block text-gray-600">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input border p-2 w-full" />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Update Details</button>
      </form>
     <Link href='/Account/profile'> <button className="cursor-pointer">Back</button> </Link>
    </div>
  );
}
