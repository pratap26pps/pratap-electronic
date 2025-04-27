"use client";

import React from "react";
import Footer from "@/components/Footer";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const page = () => {
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.auth.signupdata || null);
//  console.log("user in quick",user);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  console.log("sku before calling",sku);
  console.log("quantity before calling",quantity);

const addToCart = async (sku, quantity = 1) => {
  setloading(true);
      if (user?.role === "owner") {
        toast.error("you cannot add items,you are an owner");
        return;
      }
  try {
    console.log("sku", sku);
    console.log("quantity", quantity);
   const userId = user?.id;
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sku, quantity, userId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    console.log(`${sku} added to cart`);
    toast.success(`${sku} added to cart`)
  

  } catch (error) {
    console.error('Error:', error.message);
    toast.error(error.message)
 
  }finally{
    setloading(false);
  }
};

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);


  return (
    <div className="mt-28">
    <div className="flex justify-evenly lg:flex-row flex-col">
    <div>
        <lottie-player
          className="mt-36 "
          src="/quick-order.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      <div className=" min-h-screen flex flex-col items-center py-10">
        <div className="max-w-3xl text-center space-y-4 p-6  shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-blue-600">Quick Order</h1>
          <p className="text-gray-600">
            If you would like to add multiple parts quickly to your cart{" "}
          </p>

          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Click on Add all items to your cart.</li>
          </ol>
          <p className="text-gray-600">
            Each row will be added to the cart sequentially.
          </p>
        </div>

        <div className="mt-10 p-6 border rounded-lg shadow-md  space-y-4 w-96 ml-16">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Type Item SKU
            </label>
            <Input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Enter SKU"
              className="mt-1 "
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Quantity
            </label>
            <Button
              onClick={decreaseQuantity}
              className="px-3 bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              -
            </Button>
            <span className="px-4 text-lg font-semibold">{quantity}</span>
            <Button
              onClick={increaseQuantity}
              className="px-3 bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              +
            </Button>
          </div>

          <Button
         onClick={() => addToCart(sku, quantity)}
          className=" w-full m-5 py-2 bg-blue-600 hover:bg-blue-700 text-white ml-1 font-bold">
          {
            loading ? <div className="loader scale-50"></div>:
           " Adding to basket"
          } 
          </Button>

         <Link href="/add-cart">
          <Button
            variant="outline"
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-100 ml-1"
          >
            View Cart
          </Button>
         </Link>

        </div>
      </div>
    </div>

    
      <Footer className="mt-10" />
    </div>
  );
};

export default page;
