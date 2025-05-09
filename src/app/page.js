"use client";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { setNewsDetails } from "@/redux/slices/productSlice";
import {
  setCategoryDetails,
  setProductdetails,
  setNewProductdetails,
  setPopularProductdetails,
  setFeatureProductdetails,
} from "@/redux/slices/productSlice";
import axios from "axios";
import Hero from "./LandingPage/Hero";
import { setSignupdata } from "@/redux/slices/userSlice";
export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const loadAllData = async () => {
    try {
          const res = await fetch("/api/users/me", { cache: "no-store" });
            const data = await res.json();
            if (data.user)  dispatch(setSignupdata(data.user))
              
      const storedNews = localStorage.getItem("newsData");
      const storedCategory = localStorage.getItem("categoryData");
      const storedProduct = localStorage.getItem("productData");
   
  
      if (storedNews && storedCategory && storedProduct) {
        dispatch(setNewsDetails(JSON.parse(storedNews)));
        dispatch(setCategoryDetails(JSON.parse(storedCategory)));
  
        const productData = JSON.parse(storedProduct);
        dispatch(setProductdetails(productData.products));
        dispatch(setFeatureProductdetails(productData.featuredProducts));
        dispatch(setNewProductdetails(productData.newProducts));
        dispatch(setPopularProductdetails(productData.popularProducts));
      } else {
        const [blogRes, categoryRes, productRes] = await Promise.all([
          axios.get("/api/blog"),
          axios.get("/api/category"),
          axios.get("/api/product"),
        ]);
  
        localStorage.setItem("newsData", JSON.stringify(blogRes.data));
        localStorage.setItem("categoryData", JSON.stringify(categoryRes.data));
        localStorage.setItem("productData", JSON.stringify(productRes.data));
  
        dispatch(setNewsDetails(blogRes.data));
        dispatch(setCategoryDetails(categoryRes.data));
        dispatch(setProductdetails(productRes.data.products));
        dispatch(setFeatureProductdetails(productRes.data.featuredProducts));
        dispatch(setNewProductdetails(productRes.data.newProducts));
        dispatch(setPopularProductdetails(productRes.data.popularProducts));
      }
    } catch (error) {
      console.error("Data loading error:", error);
      toast.error("Something went wrong while loading data.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadAllData();
  }, []);
     
 
  return (
    <>
       <Hero isLoading={isLoading} />
    </>
  );
}
