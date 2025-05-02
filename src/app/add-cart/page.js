"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCart, removeFromCart } from "@/redux/slices/cartSlice";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
 

export default function YourCart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [coupon, setCoupon] = useState("");
 
  const cart = useSelector((state) => state.cart.cart || []);
  const reduxUser = useSelector((state) => state.auth.signupdata || null);
  console.log("product in cart", cart);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else {
      const storedUser = localStorage.getItem("userData");
  console.log(" storedUser", storedUser);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [reduxUser]);

  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    if (cart.length > 0) {
      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);
  
  useEffect(() => {
    setLoading(true);
    const getCart = async () => {
      if (user) {
        dispatch(fetchCart());
      }
      setLoading(false);
    };
    getCart();
  }, [dispatch, user]);

  let shipping ;

  if(cart.length === 0){
    shipping=0.00
  }else{
    shipping=50.00

  }
 
  const gstRate = 0.18;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId?.ProductPrice * (quantities[item._id] || 1),
    0
  );


  const gst = subtotal * gstRate;
  const discount = coupon === "PPS10" ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping + gst - discount;

  const paymenthandler = () => {
    if(cart.length === 0){
      toast.error("product is missing");
      return;
    }
    const updatedCartItems = cart.map((item) => ({
      ...item,
      quantity: quantities[item._id] || 1,
    }));
    
    const orderData = {
      cartItems: updatedCartItems,
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
  const removehandler =async (productId) => {
    setLoading2(true);
    console.log("productid during btn click",productId)
    dispatch(removeFromCart(productId));
   dispatch(fetchCart());
   setLoading2(false);
     
  };

  if (loading) {
    return (
      <div className="flex gap-1">
        <div className="loader"></div>
        <div className="text-center text-blue-900 mt-40 text-xl">Loading your cart...</div>
      </div>
  );
  }

  
  if (user?.role === "owner") {
    return <div className="text-center mt-40 text-lg font-medium text-red-600">
      Hey! You are an Owner, you cannot show public cart page </div>;
  }

  if (!user) {
    return <div className="text-center mt-40 text-lg font-medium text-red-600">Please log in to view your cart.</div>;
  }
  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };
  
  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };
  

  return (
    <>
      <div className="container mx-auto p-6 gap-6 mt-36">
      <div className="grid grid-cols-1 md:grid-cols-3">
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
                    <img src={item?.productId?.ProductImage} height={321} width={213} />
                    <h3 className="text-lg font-semibold">{item?.productId?.ProductTitle}</h3>
                    <p className="text-sm text-gray-500">{item?.productId?.ProductShortDescription}</p>
                    <p className="text-sm">Price: ₹{item?.productId?.ProductPrice}</p>

                    <div className="flex items-center gap-2 mt-2">
  <span>Quantity:</span>
  <button
    onClick={() => decreaseQuantity(item._id)}
    className="px-2 py-1 bg-gray-500 rounded"
  >
    -
  </button>
  <span>{quantities[item._id]}</span>
  <button
    onClick={() => increaseQuantity(item._id)}
    className="px-2 py-1 bg-gray-500 rounded"
  >
    +
  </button>
</div>

                  </div>
                  <p className="text-lg font-bold mr-3">₹{item?.productId?.ProductPrice}</p>
                  <Button onClick={() => removehandler(item.productId._id)} 
                  className="mt-2 cursor-pointer">
              {
                loading2 ? "Removing...":"Remove"
              }      
                  </Button>
                </div>
                
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-6 rounded-lg shadow">
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

          {/* Coupon Input */}
          <Input
            type="text"
            placeholder="Enter Coupon Code"
            className="mt-4 border rounded p-2 w-full"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />

          {/* Checkout Button */}
          <div
            onClick={paymenthandler}
            className="mt-4 bg-green-600 p-2 rounded-4xl text-center cursor-pointer hover:bg-green-800 w-full text-white"
          >
            Proceed to Checkout
          </div>
        </div>
      </div>
    </div> 
    <Footer/>
    
    </>
 
  );
}