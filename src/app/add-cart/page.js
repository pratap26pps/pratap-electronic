"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCart } from "@/redux/slices/cartSlice";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/redux/slices/cartSlice";

export default function YourCart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart || []);
  const user = useSelector((state) => state.auth.signupdata || null);
  console.log("product in cart", cart);
  console.log("user in cart", user);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const [coupon, setCoupon] = useState("");
  const shipping = 50;
  const gstRate = 0.18;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId?.ProductPrice * item.quantity,
    0
  );

  const gst = subtotal * gstRate;
  const discount = coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping + gst - discount;

  const paymenthandler = () => {
    const orderData = {
      cartItems: cart,
      coupon,
      shipping: shipping,
      gstRate,
      subtotal,
      discount,
      grandTotal,
    };
  
    // You can use localStorage or query params
    localStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/PlaceOrder");
  };
  const removehandler = (productId) => {
    console.log("productid during btn click",productId)
    dispatch(removeFromCart(productId));
 
  };

  return (
    <div className="container mx-auto p-6  gap-6 mt-36">
      {/* Cart Items */}
      {
        user ?
     <div className="grid grid-cols-1 md:grid-cols-3">

      <div className="md:col-span-2 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            { cart.map((item, index) => (
              <div
                key={item._id || index}
                className="flex justify-between items-center p-4 border rounded"
              >
                <div>
                  <img
                    src={item?.productId?.ProductImage}
                    height={321}
                    width={213}
                  />
                  <h3 className="text-lg font-semibold">
                    {item?.productId?.ProductTitle}
                  </h3>
               
                  <p className="text-sm text-gray-500">
                    {item?.productId?.ProductShortDescription}
                  </p>
                  <p className="text-sm">
                    Price: ₹{item?.productId?.ProductPrice}
                  </p>
                  <p className="text-sm">Quantity: {item?.quantity}</p>
                </div>
                <p className="text-lg font-bold">
                  ₹{item?.productId?.ProductPrice}
                </p>

                <Button
                  onClick={() => removehandler(item.productId._id)}
                  className="mt-2"
                >
                  Remove From Cart
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className=" p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping:</span> <span>₹{shipping}</span>
          </p>
          <p className="flex justify-between">
            <span>GST (18%):</span> <span>₹{gst.toFixed(2)}</span>
          </p>
          {discount > 0 && (
            <p className="flex justify-between text-green-500">
              <span>Discount:</span> <span>-₹{discount.toFixed(2)}</span>
            </p>
          )}
          <p className="flex justify-between font-bold text-lg">
            <span>Grand Total:</span> <span>₹{grandTotal.toFixed(2)}</span>
          </p>
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
        <div
          onClick={() => paymenthandler()}
          className="mt-4 bg-green-600 p-2 rounded-4xl text-center cursor-pointer
         hover:bg-green-800 w-full"
        >
          Proceed to Checkout
        </div>
      </div>

      </div>
       :
       <div>
           Please Login First for Add Product to Cart
       </div>
     }
    </div>
  );
}
