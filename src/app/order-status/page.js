"use client";
import React, { useState,useEffect } from "react";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const page = () => {
  const [formData, setFormData] = useState({ ordernumber: ""  });
  const [status, setstatus] = useState( "");
 console.log("status",status);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const orderhandler =async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const ordernumver = formData.ordernumber
    try{
      const res = await axios.get(`/api/payment/codallorder/${ordernumver}`);
      console.log("res for track order",res);
    if(res){
      setstatus(res?.data?.data[0]?.status)

      toast.success("order tracked success");
    }
    }catch(error){
     toast.error(error.message)
    }
  };

    useEffect(() => {
      import("@lottiefiles/lottie-player");
    }, []);

  return (
    <div className="min-h-screen  pt-40">

    <div className="flex justify-evenly lg:flex-row flex-col">


      <div className="flex flex-col justify-center items-center gap-y-8 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-500 mb-2">
          Track Your Order
        </h1>
        <form
          onSubmit={orderhandler}
          className="shadow-xl rounded-2xl p-10 w-full max-w-md space-y-6"
        >
          <Input
            name="ordernumber"
            className="text-lg px-5 py-6 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={formData.ordernumber}
            onChange={handleChange}
            placeholder="Order Id"
            required
          />
  
          <Button className="w-full py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-200">
            Track
          </Button>
        
          <p className="text-5xl text-amber-700">{status}</p>
        
      
        </form>
      </div>
      <div>
        <lottie-player
          className="mt-36 "
          src="/orderstatus.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      </div>
      <div className="mt-36">
        <Footer />
      </div>
    </div>
  );
};

export default page;
