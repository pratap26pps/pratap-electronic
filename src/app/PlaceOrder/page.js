"use client"
import React from "react";
import Razorpay from "razorpay";
const PlaceOrder = ({
  cartItems = [],
  customer,
  shippingFee = 45,
  gstRate = 0.18,
  coupon = null,
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const gst = subtotal * gstRate;
  const discount = coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shippingFee + gst - discount;
 
  const paymentcapturehandler =async ()=>{
       try{
        const res = await fetch("/api/payment/capture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: ["67ed3b62bbb00a2d3a5af7e5", "67f14582aff5d5f743b87956"],
          }),
        });
        const data = await res.json();
        console.log("data in placeorder",data);
        const paymentpoup = new window.Razorpay(data.message)
        paymentpoup.open();
        paymentpoup.om("payment failed")  
       }catch(error){
         console.log(error.messsage)
       }
  }


  return (
    <div className="max-w-4xl mt-36 mx-auto p-6  rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-green-600 font-medium">
        Earn 3% reward on each order when you sign in. The amount will be added
        to your Evelta wallet after delivery!
      </p>
      <p className="text-orange-600">
        Free shipping on orders over ₹999.00. Add items worth ₹
        {Math.max(0, 999 - subtotal).toFixed(2)} to claim the discount!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Customer</h2>
          <p>{customer?.email}</p>
          <button className="text-blue-500 text-sm underline mt-2">
            Sign Out
          </button>
        </div>

        {/* Shipping Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Shipping</h2>
          <p>{customer?.name}</p>
          <p>{customer?.contact}</p>
          <p>{customer?.address}</p>
          <p>Express Shipping ₹{shippingFee.toFixed(2)}</p>
          <button className="text-blue-500 text-sm underline mt-2">Edit</button>
        </div>

        {/* Billing Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Billing</h2>
          <p>{customer?.name}</p>
          <p>{customer?.contact}</p>
          <p>{customer?.address}</p>
          <button className="text-blue-500 text-sm underline mt-2">Edit</button>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Secure Payment</h2>
          <ul className="list-disc pl-4 space-y-1">
            <div className="flex">
              <input type="checkbox"></input>
              <li> Pay Online</li>
            </div>
            <div className="flex">
              <input type="checkbox"></input>
              <li>Cash on Delivery (up to Rs 5000 only)</li>
            </div>
            <div className="flex">
              <input type="checkbox"></input>
              <li>Bank Deposit</li>
            </div>
          </ul>
        </div>
      </div>

      {/* Order Summary */}
      <div className="  p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-bold mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item?._id} className="flex justify-between mb-2">
            <span>
              {item?.quantity} x {item.ProductTitle}
            </span>
            <span>₹{(item?.price * item?.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shippingFee?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST</span>
            <span>₹{gst?.toFixed(2)}</span>
          </div>
          {coupon && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount?.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total (INR)</span>
            <span>₹{total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => paymentcapturehandler()}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
      >
        Place Your Order
      </button>
    </div>
  );
};

export default PlaceOrder;
