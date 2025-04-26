"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
import { useDispatch } from "react-redux";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
export default function Page({ params}) {
  const { product } = use(params);
  const dispatch = useDispatch();
  const [specificproducts, setSpecificProducts] = useState({});
  const [addToCart, setAddToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.signupdata || null);

  const [position, setPosition] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  const BrandProducthandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/product/${product}`);
      setSpecificProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (product) {
      BrandProducthandler();
    }
  }, [product]);

  const gotoCart = async () => {
        if (user?.role === "owner") {
          toast.error("you cannot add items,you are an owner");
          return;
        }
    try {
      const res = await axios.get("/api/cart", { withCredentials: true });
      let cartItems = res.data.items || [];

      const isInCart = cartItems.some(
        (item) => item.productId === specificproducts._id
      );

      if (!isInCart) {
        cartItems.push({
          productId: specificproducts._id,
          price: specificproducts.ProductPrice,
          quantity: 1,
        });

        await axios.put(
          "/api/cart",
          { items: cartItems },
          { withCredentials: true }
        );
        dispatch(setAddCart(specificproducts));
        toast.success("Product added to cart!");
        setAddToCart(true);
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.productId !== specificproducts._id
        );

        await axios.put(
          "/api/cart",
          { items: updatedItems },
          { withCredentials: true }
        );
        dispatch(setRemoveCart(specificproducts._id));
        toast.success("Product removed from cart!");
        setAddToCart(false);
      }
    } catch (error) {
      toast.error("You must be logged in to perform this action.");
      console.error("Cart operation failed:", error);
    }
  };

  return (
    <>
      <div className="mt-36 px-6 lg:px-16">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link href="/" className="text-orange-500 underline">
            Home
          </Link>
          <span>/</span>
          <span>{product}</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
 <div
      className="relative w-[300px] h-[300px] overflow-hidden rounded-xl shadow-lg mx-auto"
      onMouseMove={handleMouseMove}
    >
      <img
        src={specificproducts.ProductImage}
        alt="Product"
        className="w-full h-full object-contain transition-transform duration-300 ease-in-out"
        style={{
          transformOrigin: `${position.x} ${position.y}`,
          transform: 'scale(1.5)',
        }}
      />
    </div>


            <div className="p-6 mb-4 rounded-xl shadow-lg border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                {specificproducts.ProductTitle}
              </h2>
              <p className="text-gray-600">
                {specificproducts.ProductShortDescription}
              </p>

              <p className="text-2xl text-red-500 font-bold">
                ₹{specificproducts.ProductPrice}
                <span className="text-sm text-gray-400 font-normal ml-1">
                  ex. GST
                </span>
              </p>

              <p className="text-sm font-medium text-green-600">
                {specificproducts.productItems} in Stock
              </p>
              <p className="text-sm text-gray-500">
                Shipped in 24 hours from Mumbai warehouse
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={gotoCart}
                  className={`px-5 py-2 rounded-lg text-white font-semibold shadow hover:shadow-lg transition ${
                    addToCart
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {addToCart ? "Remove from Cart" : "Add to Cart"}
                </button>
                <button className="px-5 py-2 rounded-lg border-2 border-gray-300 font-semibold hover:border-orange-400 hover:text-orange-400 transition">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
