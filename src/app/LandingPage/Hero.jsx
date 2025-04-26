import React from "react";
import { CarouselSize } from "@/components/carouseSpacing";
import { CarouselSize2 } from "@/components/corouseSpacing2";
import { CarouselSize3 } from "@/components/corouseSpacin3";
import Footer from "@/components/Footer";
import Front from "./Front";
import Link from "next/link";
import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const Hero = () => {
  const [News, setNews] = useState([]);
  const [loading, setloading] = useState(false);

  const newsreport = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/blog");
      if (response) {
        setNews(response.data);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error during fetch news", error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    newsreport();
  }, []);

  return (
    <div>
      <div className="px-4 mt-36 md:px-8 lg:px-16">
        {/* Hero Section */}

        <Front />

        {/* Featured Categories */}
        <h2 className="text-center text-2xl font-bold mt-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="  rounded-lg shadow-md text-center">
            <img
              src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/drone-parts-1.jpg?t=1732813857"
              alt="drone part"
              className="mt-2 rounded-md"
            />
          </div>
          <div className="  rounded-lg shadow-md text-center">
            <img
              src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/usb-and-hdmi-connectors-1.jpg?t=1732813882"
              alt="drone part"
              className="mt-2 rounded-md"
            />
          </div>
          <div className="  rounded-lg shadow-md text-center">
            <img
              src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/microcontroller-website-banner-m1.jpg?t=1730219309"
              alt="drone part"
              className="mt-2 rounded-md"
            />
          </div>
          <div className=" rounded-lg shadow-md text-center">
            <img
              src="https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/original/image-manager/inductors-and-chokes-1.jpg?t=1732813905 "
              alt="drone part"
              className="mt-2 rounded-md"
            />
          </div>
        </div>

        {/* Featured, New & Popular Products */}

        <div className="mt-12">
          <h2 className="text-center text-2xl font-bold">Featured Products</h2>
          <CarouselSize />
        </div>
        <div className="mt-12">
          <h2 className="text-center text-2xl font-bold">Popular Products</h2>
          <CarouselSize2 />
        </div>
        <div className="mt-12">
          <h2 className="text-center text-2xl font-bold">New Products</h2>
          <CarouselSize3 />
        </div>

        {/* Latest News */}

        <h2 className="text-center text-2xl font-bold">Latest News</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-6">
          {News.slice(0, 4).map(
            (
              item  
            ) => (
              <div key={item?._id} className="p-2 rounded-lg shadow-md">
                <img src={item?.image} alt="news" className="rounded-md" />
                <p className="font-semibold">{item?.date}</p>
                <p className="text-gray-500 mt-2">{item?.heading}</p>
                <p className="text-gray-600">{item?.description}</p>
                <p className="text-gray-500 text-sm">
                  Published by {item?.Author}
                </p>
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
