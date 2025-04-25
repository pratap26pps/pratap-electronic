"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the Lottie web component (NOT used as JSX)
const LottiePlayer = dynamic(() => import("@lottiefiles/lottie-player"), {
  ssr: false,
});

const Front = () => {
  // Optional: preload the player
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <section className="  px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* TEXT */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Elevate Your Style With <br />
            <span className="text-indigo-600">Trendy Collections</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover the latest in fashion & accessories. Shop now and upgrade your wardrobe with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

            <Link href="/Account/Signup">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition">
              Shop Now
            </button>
            </Link>
            <Link href="/about-us">
            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition">
              Learn More
            </button>
            </Link>
        
          </div>
        </motion.div>

        {/* LOTTIE ANIMATION */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Use custom element tag directly */}
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="/ecommerce.json"
            style={{ width: "300px", height: "300px" }}
          ></lottie-player>
        </motion.div>
      </div>
    </section>
  );
};

export default Front;
