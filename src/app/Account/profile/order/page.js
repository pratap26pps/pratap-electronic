"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
const Page = () => {
  const user = useSelector((state) => state.auth.signupdata);
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(false);
console.log("order in dashboard",orders);
console.log("user in dashboard",user);
  const fetchOrders = async () => {
    setloading(true)
    try {
     
      const result = await axios.get("/api/payment/cod", {
        params: { userid: user?.id },
      });
      console.log("FULL result.data:", result.data); 

      if (result?.data?.success) {
        setOrders(result.data.data);  
      } else {
        console.log("Fetch failed:", result.data.message);
      }
      setloading(false)
    } catch (error) {
      console.log("Error fetching order data:", error.message);
      setloading(false)
    }
  };

  useEffect(() => {
    if (user?.id) fetchOrders();
  }, [user]);

  return (
    <div className="max-w-6xl mt-36 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex">
      <Link href="/Account/profile">
             <Button  className="cursor-pointer">
            Back
          </Button>
            </Link>
      <h1 className="text-3xl mx-auto font-bold mb-6">🛍 My Orders</h1>
      </div>
    

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-8 rounded-md">
        <p className="font-medium">
          Track all your past orders and see details like product info, total
          cost, and delivery method. Orders placed via COD are also listed
          below.
        </p>
      </div>
{  loading ?   <span className="loader ml-[50%] mt-36"></span> :
    <div>
      {orders.length === 0 ? (
        <p className="text-gray-600">
          You have no orders yet. Start shopping now!
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl shadow-md mb-8 p-6 space-y-6"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4">
              <div>
                <p className="text-lg font-semibold">
                  Order ID: <span className="text-blue-600">{order?._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment Method: {order?.paymentMethod}
                </p>
              </div>
              <div className="text-sm text-gray-500 mt-4 md:mt-0">
                <p className="font-medium">
                  Total:{" "}
                  <span className="text-lg text-green-600 font-bold">
                    ₹{order?.grandTotal?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            {/* Product Summary */}
            <div>
              <h2 className="text-lg font-semibold mb-3 ">
                📦 Products
              </h2>
           <div className="lg:flex flex-col lg:flex-row justify-evenly">

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order?.products?.map((product) => (
                  <div
                    key={product?._id}
                    className=" border rounded-md p-4 shadow-sm"
                  >
                    <img
                      src={product?.ProductImage}
                      alt={product?.ProductImage}
                      className="w-full h-40 object-contain mb-3 rounded-md"
                    />
                    <p className="font-medium">{product?.ProductTitle}</p>
                   
                    <p className="text-sm text-gray-600">
                      {product?.ProductShortDescription}
                    </p>
                    <p className="text-sm text-gray-600">
                     price {product?.ProductPrice}
                    </p>
                  </div>
                ))}
              </div>
               
                 {/* Order Summary */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3 ">
                📑 Order Summary
              </h2>
              <div className="grid lg:w-52 grid-cols-2 gap-4 text-sm">
                <p>Subtotal: ₹{order?.subtotal?.toFixed(2)}</p>
                <p>Shipping: ₹{order?.shipping?.toFixed(2)}</p>
                <p>GST (18%): ₹{(order?.subtotal * order?.gstRate).toFixed(2)}</p>
                {order.discount > 0 && (
                  <p className="text-green-600">
                    Discount: -₹{order?.discount.toFixed(2)}
                  </p>
                )}
                <p className="col-span-2 font-semibold text-lg mt-2">
                  Grand Total: ₹{order?.grandTotal?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
            </div>          
          </div>
        ))
      )}
       </div>
}
    </div>
  );
};

export default Page;
