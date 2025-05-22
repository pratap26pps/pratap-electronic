import React from "react";
import { CarouselSize } from "@/components/carouseSpacing";
import { CarouselSize2 } from "@/components/corouseSpacing2";
import { CarouselSize3 } from "@/components/corouseSpacin3";
import Footer from "@/components/Footer";
import Front from "./Front";
 
import Link from "next/link";
import {useState, useEffect } from "react";
 
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LottiePlayer = dynamic(() => import("@lottiefiles/lottie-player"), {
  ssr: false,
});


const Hero = ({ isLoading }) => {

    useEffect(() => {
      import("@lottiefiles/lottie-player");
    }, []);
   const [isopen,setIsMenuOpen] = useState(false);
  const News = useSelector((state) => state.product.newsdata || []);
  const components = useSelector((state) => state.product.Categorydetails || []);
  const products = useSelector((state) => state.product.productdetails || []);

    
  if (isLoading) {
    return (
      <motion.div
        className="flex-1 mt-40 flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="/elephant.json"
          style={{ width: "300px", height: "300px" }}
        ></lottie-player>
      </motion.div>
    );
  }

  return (
    <div>  
    <div className="px-4 mt-36 md:px-8 lg:px-16">
      {/* Hero Section */}

      <Front />

      {/* Featured Categories */}
      {
      isopen ?      
       <div className="cursor-pointer ml-5 mt-3 hover:text-green-500" onClick={()=>setIsMenuOpen(false)}>Show Featured Category</div>
      :<div>
      <h2 className="text-center text-2xl font-bold mt-12">
        Featured Categories
      </h2>
      <div className="grid  lg:grid-cols-4 grid-cols-2 gap-6 mt-6">
      {
        components.slice(0, 4).map((name,index)=>{
          return (
            <div key={name._id} >
            <Link href={`/Totalproduct/${name._id}`}>
            <img
        src={
          // Provide your dynamic images if available; otherwise fallback to these sample images
          index === 0
            ? "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/drone-parts-1.jpg?t=1732813857"
            : index === 1
            ? "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/usb-and-hdmi-connectors-1.jpg?t=1732813882"
            : index === 2
            ? "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/microcontroller-website-banner-m1.jpg?t=1730219309"
            : index === 3
            ? "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/inductors-and-chokes-1.jpg?t=1732813905"
            : "https://via.placeholder.com/300" 
        }
        alt={name?.name}
        className="mt-2 rounded-md cursor-pointer"
      />
            </Link>  
     
            </div>
          )
        })
      }
             <div className="cursor-pointer hover:text-red-600" 
             onClick={()=>setIsMenuOpen(true)}>Close</div>
      </div>
      </div>
      }


  
      {/* Featured, New & Popular Products */}

 {/* Featured, New & Popular Products */}
<div className="mt-12">
  <h2 className="text-center text-2xl font-bold">Featured Products</h2>
  {products.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">No products available</p>
  ) : (
    <CarouselSize />
  )}
</div>

<div className="mt-12">
  <h2 className="text-center text-2xl font-bold">Popular Products</h2>
  {products.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">No products available</p>
  ) : (
    <CarouselSize2 />
  )}
</div>

<div className="mt-12">
  <h2 className="text-center text-2xl font-bold">New Products</h2>
  {products.length === 0 ? (
    <p className="text-center text-gray-500 mt-4">No products available</p>
  ) : (
    <CarouselSize3 />
  )}
</div>


      {/* Latest News */}

      <h2 className="text-center text-2xl font-bold">Latest News</h2>
    
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-6">
        {News.slice(0, 4).map(
          (
            item  
          ) => (
            <div key={item?._id} className="p-2 ml-8 bg-emerald-950 lg:ml-0 rounded-lg shadow-md">
              <Link href={`/blog/${item?._id}`}>
              <img src={item?.image} alt="news" className="rounded-md" />
              <p className="font-semibold">{item?.date}</p>
              <p className="text-gray-500 mt-2">{item?.heading}</p>
              <p className="text-gray-600">{item?.description}</p>
              <p className="text-gray-500 text-sm">
                Published by {item?.Author}
              </p>  
              </Link>
   
            </div>
          )
        )}
      </div>

      {/* View All Articles */}
      <Link href="/blog">
        <p className="text-center mb-3  text-blue-600 mt-6 cursor-pointer hover:underline">
          View all Articles
        </p>
      </Link>
    </div>
    <Footer />
    </div>
  );
};

export default Hero;
