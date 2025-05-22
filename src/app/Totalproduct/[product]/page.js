"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { addToWishlist } from "@/redux/slices/wishlist";


export default function Page() {
    const { product } = useParams();
    console.log("product id in total pps",product)
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.signupdata || null);
  const [specificproducts, setspecificproducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [Loading, setLoading] = useState(false);
  const [coupon, setcoupon] = useState("");
  const cart = useSelector((state) => state.cart.cart || []);

 
    const getProductsByCategory = async (categoryId) => {
      setLoading(true);
     try {
       
       const response = await axios.get(`/api/TotalProduct/${categoryId}`);
       const data = response.data;  
       console.log("fetching products by category:", data);
       setspecificproducts(data.products);
       
     } catch (error) {
       console.error("Error fetching products by category:", error);
       throw error;
     }finally{
      setLoading(false);
     }
   };
   useEffect(() => {
    if (product) {
        getProductsByCategory(product);
      }
   }, [product]);
 
     useEffect(() => {
       const fetchCart = async () => {
         try {
           const res = await axios.get("/api/cart", { withCredentials: true });
           const items = res.data.items || [];
     
           const cartMap = {};
           for (const item of items) {
             cartMap[item.productId._id] = true;
           }
     
           setCartItems(cartMap);
         } catch (error) {
           console.error("Error fetching cart items:", error);
         }
       };
     
       fetchCart();
     }, []);

  const gotocart = async (productId) => {
    if (user?.role === "owner") {
      toast.error("you cannot add items,you are an owner");
      return;
    }
    try {
      const res = await axios.get("/api/cart", { withCredentials: true });
      let cartItems = res.data.items || [];

      const productToToggle = specificproducts.find((p) => p._id === productId);
      if (!productToToggle) return;

      const alreadyInCart = cartItems.some(
        (item) => item.productId._id === productId
      );

      if (!alreadyInCart) {
        cartItems.push({
          productId: productToToggle._id,
          price: productToToggle.ProductPrice,
        });

        await axios.put("/api/cart", { items: cartItems });
        dispatch(setAddCart(productToToggle));
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.productId._id !== productId
        );

        await axios.put("/api/cart", { items: updatedItems });
        dispatch(setRemoveCart(productToToggle._id));
      }

      setCartItems((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));
    } catch (error) {
      toast.error("You must be logged in to perform this action");

      console.error("Cart operation failed:", error);
    }
  };


   const wishhandler = async (id) => {
        if (!user?.id || !id) {
          toast.error("User or product missing");
          return;
        }
      
        try {
          const response = await axios.post('/api/wishlist', {
            userId: user.id,
            productId:id,
          });
      
          if (response) {
            dispatch(addToWishlist(response.data));
            toast.success("Added to the wishlist");
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
    
        }
      };

  const items = cart.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = 50;
  const gstRate = 0.18;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.ProductPrice * item.quantity,
    0
  );

  const gst = subtotal * gstRate;
  const discount = coupon === "PPS10" ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping + gst - discount;

  const paymenthandler = () => {
    const orderData = {
      cartItems: cart,
      coupon,
      shipping,
      gstRate,
      subtotal,
      discount,
      grandTotal,
    };

    // You can use localStorage or query params
    localStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/PlaceOrder");
  };

  return (
    <div>
      <div className="mt-40 flex lg:flex-row flex-col gap-4">
        {/* homelink */}
        <div className="lg:hidden block">
          <div className="flex ">
            <Link href="/">
              <h1 className="text-orange-500 mx-2">
                {" "}
                <u>Home</u>{" "}
              </h1>
            </Link>
            <h1 className="mr-2">/</h1>
            <h1>{product}/</h1>
          </div>
        </div>
        {/* Sidebar filters */}
        <div className="ml-10 p-4  mb-10 lg:mb-0 h-20 rounded-2xl shadow-md w-64 border border-gray-200">
          <p className="text-lg font-semibold text-gray-700 mb-1">Refine by</p>
          <p className="text-sm text-gray-400 mb-4">No filters applied</p>

          <div className="mb-4">
            <p className="text-base font-medium text-gray-600 hover:text-orange-500 cursor-pointer transition">
              Price
            </p>
          </div>

          <div>
            <p className="text-base font-medium text-gray-600 hover:text-orange-500 cursor-pointer transition">
              Stock Status
            </p>
          </div>
        </div>

        {/* Main product content */}
        <div>
          <div className="hidden lg:block">
            <div className="flex ">
              <Link href="/">
                <h1 className="text-orange-500 mx-2">
                  {" "}
                  <u>Home</u>{" "}
                </h1>
              </Link>
              <h1 className="mr-2">/</h1>
              <h1>{product}/</h1>
            </div>
          </div>

          {Loading ? (
            <span className="loader ml-[50%] mt-36"></span>
          ) : (
            <div className="grid lg:w-[71%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                   {specificproducts.length === 0 && (
                  <div className="text-center text-gray-500 text-lg">
                    No products found for this category.
                  </div>
                )}
              {specificproducts.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-2xl shadow-lg flex flex-col justify-between p-4 h-[550px]" // fixed card height
                >
                  <Link href={`/checkproduct/${p._id}`}>
                    <div className="flex flex-col items-center text-center h-full">
                      {/* Image */}
                      <div className="h-44 w-44 mb-4 flex items-center justify-center overflow-hidden rounded-lg">
                        <img
                          src={p.ProductImage}
                          alt="productimage"
                          className="object-cover h-full w-full hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* Product Texts */}
                      <div className="flex flex-col items-center gap-2 px-2">
                        <div className="text-neutral-400 font-medium truncate">
                          {p.ProductTitle}
                        </div>

                        <div className="font-semibold hover:text-neutral-500 cursor-pointer line-clamp-2">
                          {p.ProductShortDescription}
                        </div>

                        <div className="text-lg font-bold text-red-400">
                          ₹ {p.ProductPrice}
                          <span className="text-gray-500 text-sm">
                            {" "}
                            ex. GST
                          </span>
                        </div>

                        <div className="w-full h-px bg-gray-200 my-2"></div>

                        <div className="text-sm font-semibold text-gray-700">
                          Shipped in 24 Hours from Mumbai Warehouse
                        </div>

                        <div className="text-green-600 font-semibold text-sm">
                          {p.productItems} in Stock
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      onClick={() => gotocart(p._id)}
                      className="bg-orange-400 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
                    >
                      {cartItems[p._id] ? "Remove from Cart" : "Add To Cart"}
                    </button>

                    <button
                       onClick={()=>wishhandler(p._id)}
                    className="border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-400 font-semibold py-2 rounded-lg transition shadow-md">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Review Sidebar */}
        <div className="lg:fixed z-20 mb-3 lg:mb-0  lg:left-[76%] lg:ml-0 ml-12 shadow-xl rounded-2xl p-6 w-72 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>

          <div className="space-y-3 text-sm text-gray-700">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center"
                    >
                      <img
                        src={item?.ProductImage}
                        height={34}
                        width={34}
                      ></img>
                      <span className="truncate w-2/3">
                        {item?.ProductTitle}
                      </span>
                      <span className="truncate w-2/3">
                        {item?.ProductPrice}
                      </span>
                      <span> {item?.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <span>Total items</span>
                  <span className="font-semibold">{items}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">₹ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">₹ {shipping}.00</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-green-600">
                  <span>Grand Total:</span>
                  <span>₹ {grandTotal}</span>
                </div>
              </>
            )}
            <div className="mt-6 space-y-2">
              <Link href="/add-cart">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition">
                  View Cart
                </button>
              </Link>

              <button
                onClick={paymenthandler}
                className="w-full mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                BuyNow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden block">
        <Footer />
      </div>
    </div>
  );
}
