"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setBrandid } from "@/redux/slices/productSlice";
const Page = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
 
 
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
  const [categoryid, setcategoryid] = useState("");
 console.log("catid agya",categoryid);
 const [subcategoryid, setsubcategoryid] = useState("");
 console.log("subcatid agya",subcategoryid);


  const handleBack = () => setStep((prev) => prev - 1);

  const handleNext1 = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("categry", cat);
  const result=  await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cat.CategoryName,
        description: cat.CategoryDescription,
      }),
    });
    
    const  categories= await result.json();
console.log("result aa gya",categories);

const newCategoryId = categories?._id;
console.log("categoryid aa gya",categoryid);
setcategoryid(newCategoryId);


 
    setLoading(false)
    setStep((prev) => prev + 1);
  };
  const handleNext2 = async (e) => {
    e.preventDefault();
    setLoading(true);

   const result2 = await fetch("/api/subCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subcat.SubCategoryName,
        description: subcat.SubCategoryDescription,
        categoryid
      }),
    });
    const subcatdetails = await result2.json();
    console.log("subcatdetails",subcatdetails);
    const subcatid = subcatdetails?._id;
    setsubcategoryid(subcatid);
    setLoading(false)
    setStep((prev) => prev + 1);
  };
  const handleNext3 = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    console.log("brand", brand);
    console.log("subcategoryid", subcategoryid);
  const result3 =  await fetch("/api/brandProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subcategoryid,
        name: brand.BrandName,
        description: brand.BrandCategoryDescription,
      }),
    });
    console.log("RAW response", result3);
    if (!result3.ok) {
      const errorText = await result3.text();
      console.error("API error response:", errorText);
      setLoading(false);
      return;
    }
    const brandcatdetails = await result3.json();
    console.log(" brandcatdetails", brandcatdetails);
    const  brandcatdetailsid =  brandcatdetails?._id;
     dispatch(setBrandid(brandcatdetailsid));
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

export default Page;
