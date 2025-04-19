"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize2() {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const getproductdetails = async () => {
    try {
      const result = await axios.get("/api/product");
      console.log("result", result.data);
      if (result) {
        setProducts(result.data.popularProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getproductdetails();
  }, []);

  const toggleCartItem = async (productId) => {
    setloading(true);

 

    if (status !== "authenticated") {
      try {
        const res = await axios.get("/api/cart", { withCredentials: true });
        let currentCartItems = res.data.items || [];

        const product = products.find((p) => p._id === productId);
        if (!product) return;

        const alreadyInCart = currentCartItems.some(
          (item) => item.productId === productId
        );

        if (!alreadyInCart) {
          currentCartItems.push({
            productId: product._id,
            price: product.ProductPrice,
          });
          await axios.put("/api/cart", { items: currentCartItems });
          dispatch(setAddCart(product));
        } else {
          const updatedItems = currentCartItems.filter(
            (item) => item.productId !== productId
          );
          await axios.put("/api/cart", { items: updatedItems });
          dispatch(setRemoveCart(product._id));
        }

        setCartItems((prev) => ({
          ...prev,
          [productId]: !prev[productId],
        }));
        setloading(false);
      } catch (error) {
        console.error("Cart operation failed:", error);
        setloading(false);
      }
    }
  };

  return (
    <Carousel opts={{ align: "start" }} className="">
      <CarouselContent>
        {products.map((item, index) => (
          <CarouselItem
            key={item._id || index}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <Card>
                <CardContent className="aspect-square items-center justify-center p-6">
                  <div className="shadow shadow-neutral-300 border border-b-gray-200 flex flex-col">
                    <div className="h-56 w-44 p-4 mx-auto">
                      <img
                        src={item.ProductImage}
                        alt="productimage"
                        loading="lazy"
                      />
                    </div>

                    <div className="text-neutral-400 ml-5">
                      {item.ProductTitle}
                    </div>

                    <div className="font-semibold hover:text-neutral-500 cursor-pointer ml-5">
                      {item.ProductShortDescription}
                    </div>

                    <div className="text-lg font-semibold text-red-400 ml-5">
                      ₹ {item.ProductPrice}
                      <span className="text-gray-500 text-sm"> ex. GST</span>
                    </div>

                    <div className="w-full h-px p-[1/2px] bg-gray-100 mb-3 mt-4 flex mx-auto"></div>

                    <div className="font-semibold mb-2 ml-5">
                      Shipped in 24 Hours from Mumbai Warehouse
                    </div>

                    <h1 className="font-semibold text-green-600 mb-5 ml-5">
                      {item.productItems} in Stock
                    </h1>
                  </div>

                  <div className="flex flex-col gap-2 p-4">
                    <button
                      onClick={() => toggleCartItem(item._id)}
                      className="bg-orange-400 p-2 rounded-lg focus:outline-none hover:bg-orange-300 shadow-md font-semibold text-white cursor-pointer"
                    >
                      
                      {cartItems[item._id] ? "Remove from Cart" : "Add To Cart"}
                    </button>

                    <button className="border-2 p-2 font-semibold shadow rounded-lg focus:outline-none hover:text-orange-300 cursor-pointer hover:border-orange-300">
                      ADD TO wishlist
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
