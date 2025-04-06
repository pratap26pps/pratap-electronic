"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
const page = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [cat, setCat] = useState({
    CategoryName: "",
    CategoryDescription: "",
  });
  const [subcat, setSubcat] = useState({
    SubCategoryName: "",
    SubCategoryDescription: "",
  });
  const [brand, setBrandcat] = useState({
    BrandName: "",
    BrandCategoryDescription: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleBack = () => setStep((prev) => prev - 1);

  const handleNext1 = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("categry", cat);
    await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cat.CategoryName,
        description: cat.CategoryDescription,
      }),
    });
    setLoading(false)
    setStep((prev) => prev + 1);
  };
  const handleNext2 = async (e) => {
    e.preventDefault();
    setLoading(true);
   const categorydetails= await fetch("/api/category",{
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
  });
 const  categoryid= await categorydetails._id;

    console.log("subcategry", subcat);
    await fetch("/api/subCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subcat.SubCategoryName,
        description: subcat.SubCategoryDescription,
        categoryid
      }),
    });
    setLoading(false)
    setStep((prev) => prev + 1);
  };
  const handleNext3 = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subcategorydetails= await fetch("/api/subCategory",{
      method: "GET",
      headers: { "Content-Type": "application/json" },
      
    });
   const  subcategoryid= await subcategorydetails._id; 

    console.log("brand", brand);
    await fetch("/api/brandProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subcategoryid,
        name: brand.BrandName,
        description: brand.BrandCategoryDescription,
      }),
    });
    setLoading(false)
     router.push('/upload');
  };
 

  return (
    <div className="mt-36 w-6/12 mx-auto transition-all duration-500">
      {/* Step 1: Category */}
      {step === 1 && (
        <div className="animate-fade-in p-6 border rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700">
            Product Category
          </label>
          <Input
            value={cat.CategoryName}
            onChange={(e) =>
              setCat((prev) => ({ ...prev, CategoryName: e.target.value }))
            }
            placeholder="Enter Category Name"
            className="mt-1 border"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Product Category Description
          </label>
          <textarea
            value={cat.CategoryDescription}
            onChange={(e) =>
              setCat((prev) => ({
                ...prev,
                CategoryDescription: e.target.value,
              }))
            }
            placeholder="Enter Category Description"
            className="mt-1 w-full border p-2 h-64 rounded-2xl"
          />
          <Button
            onClick={handleNext1}
            className="w-32 flex items-end t-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            {
                Loading ? "loading....":" Save and Next"
            }
           
          </Button>
        </div>
      )}

      {/* Step 2: Subcategory */}
      {step === 2 && (
        <div className="animate-fade-in p-6 border rounded-lg shadow-md">
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
            className="mt-1 w-full border p-2 h-64   rounded-2xl"
          />
          <div className="flex justify-between mt-5">
            <Button
              onClick={handleBack}
              className="w-20 mr-2 bg-gray-500 hover:bg-gray-600 text-white"
            >
              Back
            </Button>
            <Button
              onClick={handleNext2}
              className="w-32 ml-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
           {
                Loading ? "loading....":" Save and Next"
            }
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Brand */}
      {step === 3 && (
        <div className="animate-fade-in p-6 border rounded-lg shadow-md">
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
            className="mt-1 w-full border p-2 h-64   rounded-2xl"
          />
          <div className="flex justify-between mt-5">
            <Button
              onClick={handleBack}
              className="w-20 mr-2 bg-gray-500 hover:bg-gray-600 text-white"
            >
              Back
            </Button>
            <Button 
             onClick={handleNext3}
            className="w-32 ml-2 bg-green-600 hover:bg-green-700 text-white">
            {
                Loading ? "loading....":" Submit"
            }
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
