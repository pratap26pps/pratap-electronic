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
    
        const [blogRes, categoryRes, productRes] = await Promise.all([
          axios.get("/api/blog"),
          axios.get("/api/category"),
          axios.get("/api/product"),
        ]); 

        dispatch(setNewsDetails(blogRes.data));
        dispatch(setCategoryDetails(categoryRes.data));
        dispatch(setProductdetails(productRes.data.products));
        dispatch(setFeatureProductdetails(productRes.data.featuredProducts));
        dispatch(setNewProductdetails(productRes.data.newProducts));
        dispatch(setPopularProductdetails(productRes.data.popularProducts));
      }
     catch (error) {
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
