"use client";
import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/slices/wishlist";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const YourListPage = () => {
  const [addToCartIds, setAddToCartIds] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const [loading, setLoading] = useState(false);
 const [wishlistItems, setWishlistItems] = useState([]);

 
  const user = useSelector((state) => state.auth.signupdata || null);
 const userId = user?.id;
 console.log("userId",userId)
  const dispatch = useDispatch();


useEffect(() => {
  const fetchWishlist = async () => {
    if (userId) {
      setLoading(true);
      try {

        const res = await fetch(`/api/wishlist/${userId}`, {
          method: "GET",
          cache: "no-store",
        });
        const detailData = await res.json();
        if (detailData?.items?.length > 0) {
          setWishlistItems(detailData.items);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      } finally{
           setLoading(false);
      }
    } 
  };
  fetchWishlist();
}, [userId]);



  const toggleCart = async (product) => {
    const productId = product.productId._id;
    setLoadingIds((prev) => [...prev, productId]);

    try {
      const res = await axios.get("/api/cart", { withCredentials: true });
      let cartItems = res.data.items || [];

      const isInCart = cartItems.some(
        (item) => item.productId._id === productId
      );

      if (!isInCart) {
        cartItems.push({
          productId,
          price: product.productId.ProductPrice,
          quantity: 1,
        });

        await axios.put(
          "/api/cart",
          { items: cartItems },
          { withCredentials: true }
        );
        dispatch(setAddCart(product.productId));
        setAddToCartIds((prev) => [...prev, productId]);
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.productId._id !== productId
        );

        await axios.put(
          "/api/cart",
          { items: updatedItems },
          { withCredentials: true }
        );
        dispatch(setRemoveCart(productId));
        setAddToCartIds((prev) => prev.filter((id) => id !== productId));
      }
    } catch (error) {
      toast.error("You must be logged in to perform this action.");
      console.error("Cart operation failed:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== productId));
    }
  };
  const removehandler = (userId, productId, itemId) => async () => {
    try {
      const response = await axios.delete("/api/wishlist", {
        data: { userId, productId }
      });
  
      if (response.status === 200) {
        dispatch(removeFromWishlist(itemId || productId));
        toast.success("Removed successfully");
      }
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  }

  return (
    <>
 
  <div className="mx-auto mt-40 flex flex-col justify-center items-center px-4">
        <div className="flex w-full ">
          <Button asChild>
            <a href="/Account/profile">Back</a>
          </Button>
          <h1 className="text-3xl font-bold mb-6 mx-auto">Your Wishlist</h1>
        </div>
        {
          loading?<div className="loader"></div>:

        
      <div>
     {wishlistItems.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5">
            {wishlistItems.map((item) => {
              const productId = item?.productId?._id;
              const inCart = addToCartIds.includes(productId);
              const isLoading = loadingIds.includes(productId);

              return (
                <div key={item._id} className="p-4 border rounded-lg shadow-sm">
                  {item.productId.ProductImage && (
                    <img
                      src={item.productId.ProductImage}
                      alt={item.productId.ProductTitle}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  )}
                  <h2 className="text-xl font-semibold">
                    {item.productId.ProductTitle}
                  </h2>
                  <p className="text-gray-600">
                    {item.productId.ProductShortDescription}
                  </p>
                  <p className="text-gray-600">
                    ₹{item.productId.ProductPrice}
                  </p>
                  <p className="text-green-500">
                    In Stock: {item.productId.productItems}
                  </p>
                  <div className="flex flex-col lg:flex-row gap-2 mt-2">
                    <Button
                      variant="destructive"
                      onClick={removehandler(userId, item.productId._id, item._id)}
                    >
                      Remove
                    </Button>
                    <button
                      onClick={() => toggleCart(item)}
                      className={`px-5 py-2 rounded-lg text-white font-semibold shadow hover:shadow-lg transition ${
                        inCart
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                    >
                      {isLoading ? (
                        <div className="loader scale-50"></div>
                      ) : inCart ? (
                        "Remove from Cart"
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
        }
      </div>
    
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
};

export default YourListPage;
