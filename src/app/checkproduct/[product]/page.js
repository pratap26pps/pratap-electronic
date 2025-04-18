"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
import { useDispatch } from "react-redux";
import { setAddCart,setRemoveCart } from "@/redux/slices/cartSlice";

export default function Page({ params }) {

  const { product } = use(params);
  console.log("id aagya", product);
  const dispatch = useDispatch();
  const [specificproducts, setspecificproducts] = useState([]);
  const [addtocart, setaddtocart] = useState(false);
  const [loading, setloading] = useState(false);
  
const { data: session, status } = useSession();
console.log("Session:", session, "Status:", status);

  const BrandProducthandler = async () => {
    setloading(true)

    try {
      const response = await axios.get(`/api/product/${product}`);
      console.log("response of check product", response.data);
      setspecificproducts(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
    setloading(false)

  };
  useEffect(() => {
    if (product) {
      BrandProducthandler(product);
    }
  }, [product]);
 

      const gotocart = async () => {
        if (!session) {
          console.log("You must be logged in to perform this action");
          return;
        }
        if (status === "authenticated") {
        try {
          const res = await axios.get("/api/cart", { withCredentials: true });
          let cartItems = res.data.items || [];
      
          if (!addtocart) {
            // Add to cart (POST or PUT to backend)
            cartItems.push({
              productId: specificproducts._id,
              price: specificproducts.ProductPrice,
            });
      
            await axios.put("/api/cart", { items: cartItems });
      
            // Dispatch to Redux
            dispatch(setAddCart(specificproducts));
          } else {
            // Remove from cart
            const updatedItems = cartItems.filter(
              (item) => item.productId !== specificproducts._id
            );
      
            await axios.put("/api/cart", { items: updatedItems });
      
            // Dispatch to Redux
            dispatch(setRemoveCart(specificproducts._id));
          }
      
          setaddtocart((prev) => !prev);
        } catch (error) {
          console.error("Cart operation failed:", error);
        }
      };
    }
 

  return (
    <div>
         <div className="flex mt-40 ml-20">
            <Link href="/">
              {" "}
              <h1 className="text-orange-500 mx-2">
                <u>Home</u>
              </h1>
            </Link>
            <h1 className="mr-2">/</h1>
            <h1>{product}</h1>
         </div>
         {
          loading ? "loading..":
          <div className="lg:flex flex-col lg:flex-row justify-evenly">

          <div className="h-56 mt-8 w-44 p-4 ">
            <img src={specificproducts.ProductImage} alt="productimage" />
          </div>

      {/* cart review */}
      <div
        className="shadow shadow-neutral-300 border border-b-gray-200 flex flex-col">
        <div className="text-neutral-400 ml-5 ">{specificproducts.ProductTitle}</div>

        <div className="font-semibold hover:text-neutral-500 cursor-pointer ml-5">
          {specificproducts.ProductShortDescription}
        </div>

        <div className="text-lg font-semibold text-red-400 ml-5 ">
          ₹ {specificproducts.ProductPrice}
          <span className="text-gray-500 text-sm"> ex. GST</span>
        </div>

        <div className=" w-full h-px p-[1/2px] bg-gray-100  mb-3 mt-4 flex mx-auto"></div>
        <div className="font-semibold mb-2 ml-5">
          Shipped in 24 Hours from Mumbai Warehouse
        </div>
        <h1 className="font-semibold text-green-600 mb-5 ml-5">
          {specificproducts.productItems}in Stock
        </h1>
        <div className="flex flex-col gap-2 p-4">
        <button onClick={()=>gotocart()} className="bg-orange-400 p-2 rounded-lg focus:outline-none hover:bg-orange-700 shadow-md font-semibold text-white cursor-pointer ">
         {
          addtocart ?"Remove from Cart":"Add To Cart"
         }
        </button>

        <button className="border-2 p-2 font-semibold shadow rounded-lg focus:outline-none  hover:text-orange-300 cursor-pointer hover:border-orange-300">
          ADD TO wishlist
        </button>
      </div>
      </div>

    </div>
         }
    
    </div>
  );
}
