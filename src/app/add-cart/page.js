"use client"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
 
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
export default function YourCart() {
  const router = useRouter()
  const cart = useSelector((state) => state.cart.cart || []);
  console.log("product in cart",cart);
 
  const [coupon, setCoupon] = useState("");
  const shipping = 50;
  const gstRate = 0.18;
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * gstRate;
  const discount = coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping + gst - discount;

  const  paymenthandler=()=>{
      router.push('/PlaceOrder')
  }

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-36">
      {/* Cart Items */}
      <div className="md:col-span-2 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={item._id || index} className="flex justify-between items-center p-4 border rounded">
                <div>
                   <img src={item?.ProductImage} height={321} width={213}></img>
                  <h3 className="text-lg font-semibold">{item?.ProductTitle}</h3>
                  <p className="text-sm text-gray-500">{item?.ProductShortDescription}</p>
                  <p className="text-sm">Price: ₹{item?.ProductPrice}</p>
                  <p className="text-sm">Quantity: {item?.productItems}</p>
                </div>
                <p className="text-lg font-bold">₹{item?.ProductPrice  }</p>
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
        <div onClick={()=>paymenthandler()} className="mt-4 bg-green-600 p-2 rounded-4xl text-center cursor-pointer
         hover:bg-green-800 w-full">Proceed to Checkout</div>
      </div>
    </div>
  );
}
