"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.userdetail);
  console.log("user in orderplace", user);

  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses?.[0]?._id || null
  );

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };

  console.log("cart in orderplace", cart);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setloading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  console.log("ordertails in placeorder", orderDetails);
  const [error, setError] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orderData"));
    if (data) {
      setOrderDetails(data);
    }
  }, []);
  const grandTotal = orderDetails?.grandTotal;
 console.log("graandtotal",grandTotal);
const gstRate = orderDetails?.gstRate;
const shipping = orderDetails?.shipping;
const subtotal = orderDetails?.subtotal;
const discount = orderDetails?.discount || "";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};



  const paymentcapturehandler = async () => {
    setloading(true);
    if (!paymentMethod) {
      setError("Please select a payment method.");
      setloading(false);
      return;
    }
    if (!user && !selectedAddressId) {
      toast.error("user id and address is not here");
      setloading(false);
      return;
    }
    const productIds = cart.map((item) => item.productId._id);
    if (!productIds) {
      toast.error("product is not here");
      setloading(false);
      return;
    }
    const userid = user?._id;
 
    if (paymentMethod === "COD") {
      try {
        const res = await fetch("/api/payment/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: productIds,
            userId: userid,
            grandTotal,
            gstRate,
            shipping,
            subtotal,
            discount,
            selectedAddressId 
          }),
        });
        const data = await res.json();

        if (data.success) {
          toast.success("Order placed via COD successfully!");
          router.push("/OrderSuccess");
          setloading(false);
        }
      } catch (err) {
        console.error("COD Error:", err.message);
        toast.error(err.message);
        setloading(false);

      }
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.");
      setloading(false);
      return;
    }

    try {
      const res = await fetch("/api/payment/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productIds,}),
      });

      const data = await res.json();
      console.log("data for online order",data);
      const options = {
        ...data.message, // orderId, amount, currency, key, etc.
        handler: async function (response) {
          // This runs after payment is successful
          console.log("Verify API body:", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            product: productIds,
            userId: userid,
          });
          
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              product: productIds,
              userId: userid,
              grandTotal,
              gstRate,
              shipping,
              subtotal,
              discount,
              selectedAddressId
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment Done successfully  !");
            router.push("/OrderSuccess");
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.firstname || "",
          email: user?.email || "",
          contact: user?.phonenumber || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setloading(false);
    } catch (error) {
      console.error("Payment Error:", error.message);
      toast.error(error.message);

    }
    setloading(false);
  };

  return (
    <div className="max-w-4xl mt-36 mx-auto p-6  rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-green-600 font-medium">
        Earn 3% reward on each order when you sign in. The amount will be added
        to your Evelta wallet after delivery!
      </p>
      <p className="text-orange-600">
        Free shipping on orders over ₹999.00. Add items worth ₹
        {Math.max(0, 999 - { subtotal: orderDetails?.subtotal }).toFixed(2)} to
        claim the discount!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Customer</h2>
          <p>Email:{user?.email}</p>
        </div>

        {/* Shipping Info */}
        <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>

      {user?.addresses?.length > 1 ? (
        <div className="space-y-4">
          {user.addresses.map((address) => (
            <label
              key={address._id}
              className={`block border p-4 rounded cursor-pointer ${
                selectedAddressId === address._id
                  ? "border-blue-500 bg-blue-900"
                  : "border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="address"
                value={address._id}
                checked={selectedAddressId === address._id}
                onChange={handleAddressChange}
                className="mr-2"
              />
              <div>
                <p className="font-medium">{address.name}</p>
                <p>{address.street}, {address.city}, {address.state}, {address.pincode}</p>
                <p>{address.country}</p>
                <p>Phone: {address.phone}</p>
              </div>
            </label>
          ))}
        </div>
      ) : user?.addresses?.length === 1 ? (
        <div className="border p-4 rounded ">
          <p className="font-medium">{user.addresses[0].name}</p>
          <p>{user.addresses[0].street}, {user.addresses[0].city}, {user.addresses[0].state}, {user.addresses[0].pincode}</p>
          <p>{user.addresses[0].country}</p>
          <p>Phone: {user.addresses[0].phone}</p>
        </div>
      ) : (
        <p>No address found. Please add one in your profile.</p>
      )}

      {/* You can use selectedAddressId when placing the order */}
    </div>

        {/* Billing Info */}

        {/* Payment Method */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => {
                  setPaymentMethod("Online");
                  setError("");
                }}
              />
              Pay Online
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => {
                  setPaymentMethod("COD");
                  setError("");
                }}
              />
              Cash on Delivery (up to ₹5000 only)
            </label>
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      </div>

      {/* Order Summary */}
      <div className="  p-4 rounded-md shadow-sm">
        {orderDetails && (
          <div className="p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Subtotal:</span> ₹{orderDetails?.subtotal?.toFixed(2)}
              </p>
              <p className="flex justify-between">
                <span>Shipping:</span> ₹{orderDetails?.shipping}
              </p>
              <p className="flex justify-between">
                <span>GST (18%):</span> ₹
                {(orderDetails?.subtotal * orderDetails?.gstRate).toFixed(2)}
              </p>
              {orderDetails.discount > 0 && (
                <p className="flex justify-between text-green-500">
                  <span>Discount:</span> -₹{orderDetails?.discount.toFixed(2)}
                </p>
              )}
              <p className="flex justify-between font-bold text-lg">
                <span>Grand Total:</span> ₹{orderDetails?.grandTotal.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => paymentcapturehandler()}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
      >
        {loading ? <div>loading..</div> : "Place Your Order"}
      </Button>
    </div>
  );
};

export default PlaceOrder;
