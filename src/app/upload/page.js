"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdStyle } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { IconGolfFilled } from "@tabler/icons-react";

export default function ProductInfoForm() {
  const [formData, setFormData] = useState({
    ProductTitle: "",
    ProductShortDescription: "",
    ProductPrice: "",
    BenefitsOfProduct: "",
    ProductImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, ProductImage: e.target.files[0] }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    const newFormData = new FormData();
    newFormData.append("ProductTitle", formData.ProductTitle);
    newFormData.append("ProductShortDescription", formData.ProductShortDescription);
    newFormData.append("ProductPrice", formData.ProductPrice);
    newFormData.append("BenefitsOfProduct", formData.BenefitsOfProduct);
  
    if (formData.ProductImage) {
      newFormData.append("ProductImage", formData.ProductImage);
    } else {
      console.error("No file selected!");
    }
  
    console.log("FormData Entries:", [...newFormData.entries()]);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: newFormData,
      });

      console.log("Response received:", response.status);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage("Product added successfully!");
      setFormData({
        ProductTitle: "",
        ProductShortDescription: "",
        ProductPrice: "",
        BenefitsOfProduct: "",
        ProductImage: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scale-75 flex justify-evenly lg:scale-100">
      <form onSubmit={handleSubmit} className="mt-36 p-6 rounded-md space-y-5">
        <div>
          <label htmlFor="ProductTitle">
            Product Title <sup>*</sup>
          </label>
          <input
            id="ProductTitle"
            value={formData.ProductTitle}
            onChange={handleChange}
            placeholder="Enter the Product title"
            className="w-full border p-1 rounded-md font-semibold"
          />
        </div>

        <div>
          <label htmlFor="ProductShortDescription">
            Product Short Description <sup>*</sup>
          </label>
          <textarea
            id="ProductShortDescription"
            value={formData.ProductShortDescription}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full min-h-[120px] border p-1 rounded-md font-semibold"
          />
        </div>

        <div className="relative">
          <label htmlFor="ProductPrice">
            Product Price <sup>*</sup>
          </label>
          <div className="flex items-center border p-1 rounded-md font-semibold">
            <HiOutlineCurrencyRupee className="mr-2 text-lg" />
            <input
              id="ProductPrice"
              type="number"
              value={formData.ProductPrice}
              onChange={handleChange}
              placeholder="Enter the Product price"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Upload Thumbnail */}
        <div>
          <label className="block font-medium mb-2">Upload Product Thumbnail</label>
          <input
            type="file"
            id="ProductImage"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleFileChange}
            className="font-bold p-3 cursor-pointer rounded-md"
          />
        </div>

        {/* Benefits of Product */}
        <div>
          <label htmlFor="BenefitsOfProduct">
            Benefits of Product <sup>*</sup>
          </label>
          <textarea
            id="BenefitsOfProduct"
            value={formData.BenefitsOfProduct}
            onChange={handleChange}
            placeholder="Enter Product benefits"
            className="w-full h-[190px] border p-1 rounded-md font-semibold"
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="flex gap-6">
          <Link href="/Account/profile">
            <button type="button" className="cursor-pointer rounded-2xl p-2 border">
              Back
            </button>
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 cursor-pointer text-amber-50 rounded-2xl p-2 hover:bg-blue-950"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Product Upload Tips */}
      <div className="scale-75 p-8 mt-36 rounded-md h-96 w-[100vw] lg:w-[34vw]">
        <div className="flex gap-6">
          <MdStyle className="text-blue-400 mt-7 scale-[243%]" />
          <p className="my-5 lg:text-3xl text-xl text-yellow-600">Product Upload Tips</p>
        </div>

        <ul className="my-4 w-96 space-y-2">
          <li className="flex gap-2">
            <IconGolfFilled /> Set the Course Price option or make it free.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Standard size for the course thumbnail is 1024x576.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Video section controls the course overview video.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Course Builder is where you create & organize a course.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Add Topics in the Course Builder section.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Information from the Additional Data section.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Make Announcements to notify any important updates.
          </li>
          <li className="flex gap-2">
            <IconGolfFilled /> Notes to all enrolled students at once.
          </li>
        </ul>
      </div>
    </div>
  );
}
