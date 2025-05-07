"use client";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import axios from "axios";
export default function ProfileUpdateForm() {
  const user = useSelector((state) => state.auth.userdetail || null);
  console.log("user in update", user);

  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname    || "",
    gstno: user?.gstno || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("formData in update", formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.put("/api/users/me", formData);
      toast.success("Profile updated successfully!");
      console.log("Server Response:", data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 shadow-md rounded-xl mt-36">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="input  border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="input border p-2 w-full"
              />
            </div>
          </div>

 
          <div>
            <label className="block text-gray-600">GST Number</label>
            <input
              type="text"
              name="gstno"
              value={formData.gstno}
              onChange={handleChange}
              className="input border p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input border p-2 w-full"
            />
          </div>
          <button
            type="submit"  disabled={loading}
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
          {
            loading ?"Updating...":"Update Details"
          } 
          </button>
        </form>
        <Link href="/Account/profile">
          {" "}
          <button className="cursor-pointer mt-3 flex gap-2">
          <FaArrowAltCircleLeft className="mt-1"/>   Back
             
          </button>{" "}
        </Link>
      </div>
      <Footer />
    </div>
  );
}
