"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react"; 
export default function Page({ params }) {
 
  const { product } = use(params)
  const dispatch = useDispatch();

  const [specificproducts, setspecificproducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [Loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  console.log("Session in cart API:", session);

  const BrandProducthandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/productbybrand?brandId=${product}`
      );
      console.log(
        "response during get product of specific brand",
        response.data
      );
      setspecificproducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (product) {
      BrandProducthandler();
    }
  }, [product]);

  const gotocart = async (productId) => {
    if (!session) {
      console.log("You must be logged in to perform this action");
      return;
    }

    if (status === "authenticated") {
      try {
        const res = await axios.get("/api/cart", { withCredentials: true });
        let cartItems = res.data.items || [];

        const productToToggle = specificproducts.find((p) => p._id === productId);
        if (!productToToggle) return;

        const alreadyInCart = cartItems.some(
          (item) => item.productId === productId
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
            (item) => item.productId !== productId
          );

          await axios.put("/api/cart", { items: updatedItems });
          dispatch(setRemoveCart(productToToggle._id));
        }

        setCartItems((prev) => ({
          ...prev,
          [productId]: !prev[productId],
        }));
      } catch (error) {
        console.error("Cart operation failed:", error);
      }
    }
  };

  return (
    <div>
      <div className="mt-40 flex gap-4">
        {/* Sidebar filters */}
        <div className="ml-10 p-4 h-20 rounded-2xl shadow-md w-64 border border-gray-200">
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
          <div className="flex">
            <Link href="/">
              <h1 className="text-orange-500 mx-2">
                <u>Home</u>
              </h1>
            </Link>
            <h1 className="mr-2">/</h1>
            <h1>{product}</h1>
          </div>

          {Loading ? (
            <span className="loader ml-[50%] mt-36"></span>
          ) : (
            <div className="grid w-[71%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {specificproducts.map((p) => (
                <div
                  key={p._id}
                  className="border my-2 rounded shadow-lg aspect-square items-center justify-center p-6"
                >
                  <Link href={`/checkproduct/${p._id}`}>
                    <div className="shadow shadow-neutral-300 border border-b-gray-200 flex flex-col">
                      <div className="h-56 w-44 p-4 mx-auto">
                        <img src={p.ProductImage} alt="productimage" />
                      </div>

                      <div className="text-neutral-400 ml-5">{p.ProductTitle}</div>
                      <div className="font-semibold hover:text-neutral-500 cursor-pointer ml-5">
                        {p.ProductShortDescription}
                      </div>
                      <div className="text-lg font-semibold text-red-400 ml-5">
                        ₹ {p.ProductPrice}
                        <span className="text-gray-500 text-sm"> ex. GST</span>
                      </div>

                      <div className="w-full h-px p-[1/2px] bg-gray-100 mb-3 mt-4 flex mx-auto"></div>
                      <div className="font-semibold mb-2 ml-5">
                        Shipped in 24 Hours from Mumbai Warehouse
                      </div>
                      <h1 className="font-semibold text-green-600 mb-5 ml-5">
                        {p.productItems} in Stock
                      </h1>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-2 p-4">
                    <button
                      className="bg-orange-400 p-2 rounded-lg focus:outline-none hover:bg-orange-300 shadow-md font-semibold text-white cursor-pointer"
                      onClick={() => gotocart(p._id)}
                    >
                      {cartItems[p._id] ? "Remove from Cart" : "Add To Cart"}
                    </button>

                    <button className="border-2 p-2 font-semibold shadow rounded-lg focus:outline-none hover:text-orange-300 cursor-pointer hover:border-orange-300">
                      ADD TO wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Review Sidebar */}
        <div className="fixed left-[76%] shadow-xl rounded-2xl p-6 w-72 hidden sm:block border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>

          <div className="space-y-3 text-sm text-gray-700">
            <p className="text-center text-gray-500 italic">
              Your cart is empty
            </p>

            <div className="flex justify-between">
              <span>Total items</span>
              <span className="font-semibold">0</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">₹ 0.00</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-medium">₹ 0.00</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>Grand Total:</span>
              <span>₹ 0.00</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Link href="/add-cart">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition">
                View Cart
              </button>
            </Link>

            <Link href="/">
              <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                BuyNow
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
