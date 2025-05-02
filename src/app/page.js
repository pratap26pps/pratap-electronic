"use client";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { setSignupdata, setUserdetail } from "@/redux/slices/userSlice";
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

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

 

  const loadAllData = async () => {
    try {
      const userRes = await fetch("/api/users/me", { cache: "no-store" });
      const userData = await userRes.json();
      if (userData.user) {
        localStorage.setItem("userData", JSON.stringify(userData.user));
        dispatch(setSignupdata(userData.user));
      }
  
      const detailRes = await fetch(`/api/users/signup?email=${userData.user?.email}`, {
        method: "GET",
        cache: "no-store",
      });
      const detailData = await detailRes.json();
      if (detailData.user) dispatch(setUserdetail(detailData.user));
  
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
    } catch (error) {
      console.error("Data loading error:", error);
      toast.error("Something went wrong while loading data.");
    } finally {
      setIsLoading(false); // All done
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
