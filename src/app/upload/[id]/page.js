"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    ProductTitle: "",
    ProductShortDescription: "",
    ProductPrice: "",
    productItems:"",
    BenefitsOfProduct: "",
    ProductImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [ThumbnailPreview, setThumbnailPreview] = useState();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        // console.error("data of iteems:", data);

        setFormData({
          ProductTitle: data.data.ProductTitle,
          ProductShortDescription: data.data.ProductShortDescription,
          ProductPrice: data.data.ProductPrice,
          productItems: data.data.productItems,
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
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("ProductTitle", formData.ProductTitle);
    formDataToSend.append("ProductShortDescription", formData.ProductShortDescription);
    formDataToSend.append("ProductPrice", formData.ProductPrice);
    formDataToSend.append("productItems", formData.productItems);
    formDataToSend.append("BenefitsOfProduct", formData.BenefitsOfProduct);
    formDataToSend.append("id", id);

    if (formData.ProductImage) {
      formDataToSend.append("ProductImage", formData.ProductImage);
    }

    try {
      const response = await axios.put("/api/product", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Product updated successfully!");
      } else {
        console.error("Failed to update product:", response.data);
        toast.error( response.data)
      }
    } catch (error) {
      toast.error(error.response?.data)
      console.error("Error updating product:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, ProductImage: file });
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen  pt-28 px-4">
      <div className="max-w-4xl mx-auto shadow-xl rounded-3xl p-10">
        <h1 className="text-3xl font-semibold text-center  mb-8">Edit Product</h1>
        <form onSubmit={submithandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Product Title</label>
            <input
              type="text"
              value={formData.ProductTitle}
              onChange={(e) => setFormData({ ...formData, ProductTitle: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <textarea
              value={formData.ProductShortDescription}
              onChange={(e) =>
                setFormData({ ...formData, ProductShortDescription: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2 min-h-[100px] resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Price (₹)</label>
            <input
              type="number"
              value={formData.ProductPrice}
              onChange={(e) => setFormData({ ...formData, ProductPrice: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product  quantity</label>
            <input
              type="number"
              value={formData.productItems}
              onChange={(e) => setFormData({ ...formData, productItems: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Product Thumbnail</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleThumbnailChange}
              className="w-full border rounded-xl px-4 py-2 font-medium"
            />
            {ThumbnailPreview && (
              <img
                src={ThumbnailPreview}
                alt="Preview"
                className="mt-4 w-52 h-36 object-cover rounded-xl shadow"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Benefits of Product</label>
            <textarea
              value={formData.BenefitsOfProduct}
              onChange={(e) =>
                setFormData({ ...formData, BenefitsOfProduct: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2 min-h-[150px] resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <Link href="/Account/profile">
              <Button variant="outline" className="flex gap-2 items-center px-6 py-3 rounded-xl">
                <FaLongArrowAltLeft /> Back
              </Button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r cursor-pointer from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl shadow hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
