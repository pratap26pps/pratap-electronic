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
      const storedUser = localStorage.getItem("userData");
      const storedNews = localStorage.getItem("newsData");
      const storedCategory = localStorage.getItem("categoryData");
      const storedProduct = localStorage.getItem("productData");
  
      if (storedUser) {
        dispatch(setSignupdata(JSON.parse(storedUser)));
      } else {
        const userRes = await fetch("/api/users/me", { cache: "no-store" });
        const userData = await userRes.json();
        if (userData.user) {
          localStorage.setItem("userData", JSON.stringify(userData.user));
          dispatch(setSignupdata(userData.user));
        }
      }
  
      const email = JSON.parse(localStorage.getItem("userData"))?.email;
      if (email) {
        const detailRes = await fetch(`/api/users/signup?email=${email}`, {
          method: "GET",
          cache: "no-store",
        });
        const detailData = await detailRes.json();
        if (detailData.user) dispatch(setUserdetail(detailData.user));
      }
  
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
