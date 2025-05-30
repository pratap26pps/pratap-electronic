"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import Link from "next/link";
import { addToWishlist } from "@/redux/slices/wishlist";

export function CarouselSize2() {
 
  const [loading, setloading] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const dispatch = useDispatch();
   const user = useSelector((state) => state.auth.signupdata || null);
   console.log("user in coursespacing2",user);
   const products = useSelector((state) => state.product.NewProductdetails || []);
  console.log("prosuct in home page",products)
 
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
  


  const toggleCartItem = async (productId) => {
    setloading(true);
           if(user?.role ==="owner"){
             toast.error("you cannot add items,you are an owner");
             return;
            }
     
      try {
        const res = await axios.get("/api/cart", { withCredentials: true });
        let currentCartItems = res.data.items || [];
      //  console.log("currentCartItems",currentCartItems);
        const product = products.find((p) => p._id === productId);
        if (!product) return;

        const alreadyInCart = currentCartItems.some(
          (item) => item.productId._id === productId
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
            (item) => item.productId._id !== productId
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
              toast.error("You must be logged in to perform this action")
        
        console.error("Cart operation failed:", error);
        setloading(false);
      }
    
  };

   const wishhandler = async (id) => {
      if (!user?.id ||  !id) {
        toast.error("User or product missing");
        return;
      }
    
      try {
        const response = await axios.post('/api/wishlist', {
          userId: user.id,
          productId: id,
        });
    
        if (response) {
          dispatch(addToWishlist(response.data));
          toast.success("Added to the wishlist");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
  
      }
    };

  return (
    <Carousel opts={{ align: "start" }} className="">
      <CarouselContent>
        {products.map((item, index) => (
               <CarouselItem key={item._id || index} className="md:basis-1/2 lg:basis-1/3">
               <div>
                 <Card className=" flex flex-col justify-between"> {/* Fixed total height */}
                   <CardContent className="items-center justify-center flex-1">
                   <Link href={`/checkproduct/${item._id}`}>
                     <div className="shadow shadow-neutral-300 border border-b-gray-200 flex flex-col h-full">
                       
                       {/* Image with fixed size */}
                       <div className="h-48 w-48 mx-auto mt-4 flex items-center justify-center overflow-hidden">
                 
                       <img
                          src={item.ProductImage}
                          alt="productimage"
                            loading="lazy"
                          className="object-cover h-full w-full hover:scale-105 transition duration-300"
                        />
                       </div>
             
                       {/* Text section */}
                       <div className="flex-1 flex flex-col justify-between p-2">
                         <div className="text-neutral-400 text-center text-sm truncate">
                           {item.ProductTitle}
                         </div>
             
                         <div className="font-semibold text-center text-neutral-700 line-clamp-2">
                           {item.ProductShortDescription}
                         </div>
             
                         <div className="text-lg font-semibold text-red-400 text-center">
                           ₹ {item.ProductPrice}
                           <span className="text-gray-500 text-sm"> ex. GST</span>
                         </div>
             
                         <div className="w-full h-px bg-gray-100 my-1"></div>
             
                         <div className="font-semibold text-center text-gray-700 text-sm">
                           Shipped in 24 Hours from Mumbai Warehouse
                         </div>
             
                         <h1 className="font-semibold text-green-600 text-center text-sm mt-1">
                           {item.productItems} in Stock
                         </h1>
                       </div>
                     </div>
                   </Link>
                     {/* Buttons */}
                     <div className="flex flex-col gap-1 mt-1">
                       <button
                         onClick={() => toggleCartItem(item._id)}
                         className="bg-orange-400 p-2 rounded-lg focus:outline-none hover:bg-orange-700 shadow-md font-semibold text-white"
                       >
                         {cartItems[item._id] ? "Remove from Cart" : "Add To Cart"}
                       </button>
             
                       <button
                                        onClick={()=>wishhandler(item._id)}

                       className="border-2 p-2 font-semibold shadow rounded-lg focus:outline-none hover:text-orange-300 hover:border-orange-300">
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
