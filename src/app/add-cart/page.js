"use client"
// import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function YourCart() {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.items);
   const cart =[
    {
        name:"pamkaj",
        description:"hello",
        price:"4",
        quantity:"3"
    },
    {
        name:"pamkj",
        description:"suraj",
        price:"4",
        quantity:"23"
    }
   ]
  const [coupon, setCoupon] = useState("");
  const shipping = 50;
  const gstRate = 0.18;
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * gstRate;
  const discount = coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping + gst - discount;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-36">
      {/* Cart Items */}
      <div className="md:col-span-2 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm">Price: ₹{item.price}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Order Summary */}
      <div className=" p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <p className="flex justify-between"><span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span></p>
          <p className="flex justify-between"><span>Shipping:</span> <span>₹{shipping}</span></p>
          <p className="flex justify-between"><span>GST (18%):</span> <span>₹{gst.toFixed(2)}</span></p>
          {discount > 0 && <p className="flex justify-between text-green-500"><span>Discount:</span> <span>-₹{discount.toFixed(2)}</span></p>}
          <p className="flex justify-between font-bold text-lg"><span>Grand Total:</span> <span>₹{grandTotal.toFixed(2)}</span></p>
        </div>
        
        {/* Coupon Code */}
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Enter Coupon Code"
            className="border rounded p-2 w-full"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
        </div>
        
        {/* Checkout Button */}
        <Button className="mt-4 w-full">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
