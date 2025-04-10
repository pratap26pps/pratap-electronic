"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams(); // Get ID from the URL
  const [formData, setFormData] = useState({
    ProductTitle: "",
    ProductShortDescription: "",
    ProductPrice: "",
    BenefitsOfProduct: "",
    ProductImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [ThumbnailPreview, setThumbnailPreview] = useState();

  useEffect(() => {
    if (!id) return;

    // Fetch product data by ID
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);

        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        console.log("data", data);
        setFormData({
          ProductTitle: data.data.ProductTitle,
          ProductShortDescription: data.data.ProductShortDescription,
          ProductPrice: data.data.ProductPrice,
          BenefitsOfProduct: data.data.BenefitsOfProduct,
          ProductImage: data.data.ProductImage,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const submithandler = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('ProductTitle', formData.ProductTitle);
    formDataToSend.append('ProductShortDescription', formData.ProductShortDescription);
    formDataToSend.append('ProductPrice', formData.ProductPrice);
    formDataToSend.append('BenefitsOfProduct', formData.BenefitsOfProduct);
    formDataToSend.append('id',id);
  
    if (formData.ProductImage) {
      formDataToSend.append('ProductImage', formData.ProductImage); // Ensure ProductImage is a File object
    }
  
    console.log('Sending FormData:', Object.fromEntries(formDataToSend.entries())); // Debugging
  
    try {
      const response = await axios.put('/api/product', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
  
      if (response.status === 200) {
        alert('Product updated successfully!');
      } else {
        console.error('Failed to update product:', response.data);
      }
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error);
    }
  };
    

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setThumbnailPreview(fileURL);
    }
  };
  

  return (
    <div className="scale-75 flex justify-evenly lg:scale-100">
      <form onSubmit={submithandler} className="mt-36 p-6 rounded-md space-y-5">
        <h1 className="flex justify-center">Edit Product</h1>

        <div>
          <label htmlFor="ProductTitle">
            Product Title <sup>*</sup>
          </label>
          <input
            type="text"
            value={formData.ProductTitle || ""}
            onChange={(e) =>
              setFormData({ ...formData, ProductTitle: e.target.value })
            }
            className="w-full border p-1 rounded-md font-semibold"
          />
        </div>
        <div>
          <label htmlFor="ProductShortDescription">
            Product Short Description <sup>*</sup>
          </label>
          <textarea
            type="text"
            value={formData.ProductShortDescription || ""}
            onChange={(e) =>
              setFormData({ ...formData, ProductShortDescription: e.target.value })
            }
            className="w-full min-h-[120px] border p-1 rounded-md font-semibold"
          />
        </div>

        <div className="relative">
          <label htmlFor="ProductPrice">
            Product Price <sup>*</sup>
          </label>
          <div className="flex items-center border p-1 rounded-md font-semibold">
            <input
              type="number"
              value={formData.ProductPrice || ""}
              onChange={(e) =>
                setFormData({ ...formData, ProductPrice: e.target.value })
              }
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
            onChange={handleThumbnailChange}
            className="font-bold p-3 cursor-pointer rounded-md"
          />
        </div>

        <div >
 
              {/* Display the thumbnail preview */}
              {ThumbnailPreview && (
                <div className="thumbnail-preview mb-4">
                  <img
                    src={ThumbnailPreview}
                    alt="Course Thumbnail Preview"
                    className="w-52 h-32 ml-5 p-1 rounded-md font-semibold"
                  />
                </div>
              )}
            </div>

        {/* Benefits of Product */}
        <div>
          <label htmlFor="BenefitsOfProduct">
            Benefits of Product <sup>*</sup>
          </label>
          <textarea
            type="text"
            value={formData.BenefitsOfProduct || ""}
            onChange={(e) =>
              setFormData({ ...formData, BenefitsOfProduct: e.target.value })
            }
            className="w-full h-[190px] border p-1 rounded-md font-semibold"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-800 p-4 border rounded-2xl flex justify-center "
        >
          {loading ? "Updating...." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
