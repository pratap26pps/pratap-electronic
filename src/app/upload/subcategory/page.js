"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setselectedCategoryId } from "@/redux/slices/productSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [subcat, setSubcat] = useState({
    SubCategoryName: "",
    SubCategoryDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const result = await axios.get("/api/category");
        console.log("Fetched Categories:", result.data);
        if (result.data.length > 0) {
          setProductCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(setselectedCategoryId(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  const handleBack = () => {
    router.push("/upload/category");
  };

  const handleNext = () => {
    router.push("/upload/brandcategory");
  };

  const handleNext2 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch("/api/subCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subcat.SubCategoryName,
          description: subcat.SubCategoryDescription,
          selectedCategoryId,
        }),
      });

      const subcatDetails = await response.json();
      console.log("Subcategory Created:", subcatDetails);

      // Reset form
      setSubcat({
        SubCategoryName: "",
        SubCategoryDescription: "",
      });
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-36 w-6/12 mx-auto transition-all duration-500">
      <div className="animate-fade-in p-6 border rounded-lg shadow-md">
        {productCategories.length > 0 ? (
          <div>
            <label>
              Product Category <sup>*</sup>
            </label>
            <select
              id="productcategory"
              defaultValue=""
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full p-2 border bg-gray-500 mb-2 rounded-md font-semibold"
            >
              <option value="" disabled>
                {loading ? "Loading categories..." : "Choose a category"}
              </option>
              {productCategories.map((category) => (
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
          Product Sub-Category
        </label>
        <Input
          value={subcat.SubCategoryName}
          onChange={(e) =>
            setSubcat((prev) => ({
              ...prev,
              SubCategoryName: e.target.value,
            }))
          }
          placeholder="Enter SubCategory Name"
          className="mt-1 border"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Sub-Category Description
        </label>
        <textarea
          value={subcat.SubCategoryDescription}
          onChange={(e) =>
            setSubcat((prev) => ({
              ...prev,
              SubCategoryDescription: e.target.value,
            }))
          }
          placeholder="Enter SubCategory Description"
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
              onClick={handleNext2}
              className="w-32 ml-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handleNext}
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
