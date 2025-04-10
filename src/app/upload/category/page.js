"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Page = () => {
  
  const router = useRouter();

  const [cat, setCat] = useState({
    CategoryName: "",
    CategoryDescription: "",
  });
  console.log("category", cat);
  const [Loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push("/Account/profile");
  };
  const handlenext = () => {
    router.push("/upload/subcategory");
  };

  const handleNext1 = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("categry", cat);
    const result = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cat.CategoryName,
        description: cat.CategoryDescription,
      }),
    });
    const categories = await result.json();
    console.log("result aa gya", categories);

    setCat({
      CategoryName: "",
      CategoryDescription: "",
    });

    setLoading(false);
  };

  return (
    <div className="mt-36 w-6/12 mx-auto transition-all duration-500">
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
          required
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
          required
        />
        <div className="flex justify-between">
          <Button
            onClick={handleBack}
            className="w-32 flex cursor-pointer items-end t-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Back
          </Button>
          <div className="lg:flex gap-1 lg:flex-row md:flex-row sm:flex-col">
            <Button
              onClick={handleNext1}
              disabled={Loading}
              className="w-32 cursor-pointer flex items-end t-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50"
            >
              {Loading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handlenext}
              className="w-32 cursor-pointer flex items-end t-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
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
