"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSubCategoryId} from "@/redux/slices/productSlice";

const Page = () => {
  const router = useRouter();
  const dispatch= useDispatch();
  const selectedCategoryId  = useSelector((state) => state.product.selectedCategoryId);
  console.log("selectectedcatedid in brandcategory",selectedCategoryId)
  const [brand, setBrandcat] = useState({
    BrandName: "",
    BrandCategoryDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [productSubcategories, setProductSubcategories] = useState([]);
  const [SubCategoryId,setLocalSubCategoryId] = useState("");

  console.log("SubCategoryId",SubCategoryId);

  const getSubCategories = async () => {
    try {
      setLoading(true);
      const result =await axios.get(`/api/subCategory?categoryId=${selectedCategoryId}`)
      console.log("Fetched Subcategories:", result.data);
      if (result.data.length > 0) {
        setProductSubcategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };
 
   useEffect(() => {
    if (selectedCategoryId) {
      getSubCategories();
    }
  }, [selectedCategoryId]);
 

  const handleBack = () => {
    router.push("/upload/subcategory");
  };

  const handleNext = (SubCategoryId) => {
    dispatch(setSubCategoryId(SubCategoryId));
    router.push("/upload");
  };

  const handleNext3 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch("/api/brandProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          SubCategoryId,
          name: brand.BrandName,
          description: brand.BrandCategoryDescription,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", errorText);
        return;
      }

      const data = await response.json();
      console.log("Brand Created:", data);

      // Optionally reset the form
      setBrandcat({
        BrandName: "",
        BrandCategoryDescription: "",
      });
    } catch (error) {
      console.error("Error submitting brand:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-36 w-6/12 mx-auto transition-all duration-500">
      <div className="animate-fade-in p-6 border rounded-lg shadow-md">
        {productSubcategories.length > 0 ? (
          <div>
            <label>
              Sub-Category Name<sup>*</sup>
            </label>
            <select
              id="productSubcategory"
              defaultValue=""
 
              onChange={(e) => setLocalSubCategoryId(e.target.value)}

              className="w-full p-2 border bg-gray-500 mb-2 rounded-md font-semibold"
            >
              <option value="" disabled>
                {loading ? "Loading categories..." : "Choose a Subcategory"}
              </option>
              {productSubcategories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Brand Category
        </label>
        <Input
          value={brand.BrandName}
          onChange={(e) =>
            setBrandcat((prev) => ({ ...prev, BrandName: e.target.value }))
          }
          placeholder="Enter Brand Name"
          className="mt-1 border"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Brand Description
        </label>
        <textarea
          value={brand.BrandCategoryDescription}
          onChange={(e) =>
            setBrandcat((prev) => ({
              ...prev,
              BrandCategoryDescription: e.target.value,
            }))
          }
          placeholder="Enter Brand Description"
          className="mt-1 w-full border p-2 h-64 rounded-2xl"
        />

        <div className="flex justify-between mt-5">
          <Button
            onClick={handleBack}
            className="w-20 mr-2 bg-gray-500 hover:bg-gray-600 text-white"
          >
            Back
          </Button>

          <div className="lg:flex flex-col lg:flex-row">
            <Button
              onClick={handleNext3}
              className="w-32 ml-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={() => handleNext(SubCategoryId)}
              className="w-32 ml-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
