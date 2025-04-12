import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FaUserPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineEditLocation } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { NavigationMenuDemo } from "../dropdownmenu";
import Image from "next/image";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users/me", { cache: "no-store" });
      const data = await res.json();
      if (data.user) {
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log("user", user);

  const logouthandler = async () => {
    try {
      await axios.get("/api/users/logout");
      Cookies.remove("token");
      setUser(null);
      router.refresh();
      router.push("/Account/Login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // for search box

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product'); // Change to your actual API endpoint
        const data = await response.json();
        console.log("data heee",data)
        setAllProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
 

  const handleSearchChange = (e) => {

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const results = allProducts.filter(product =>
        product.ProductTitle.toLowerCase().includes(value)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }

  };

  const gotoproduct=(id)=>{
    router.push(`/checkproduct/${id}`)
    setSearchTerm("")
    setFilteredProducts([]);
  }

  return (
    <div className="p-4 fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-between px-4 md:px-8 ">
        {/* Logo  */}
        <div className="">
          <Link href="/">
            <div> EmbProto</div>
          </Link>
        </div>
        {/* Search Bar (Hidden on Small Screens) */}
        <div className="hidden md:flex items-center gap-2 p-2 w-[60%] border rounded-full bg-gray-100 shadow-sm focus-within:shadow-md transition-shadow duration-300">
          <FaSearch className="text-gray-500 ml-4" />
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="search"
            placeholder="Search for product..."
            className="w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2"
          />
           {filteredProducts.length > 0 && (
        <div className="absolute grid grid-cols-3 grid-rows-2 top-full z-50 -mt-16 gap-1  w-[55%] bg-gray-500 border rounded shadow-md p-2">
          {filteredProducts.map(product => (
           
            <div onClick={()=>gotoproduct(product._id)} key={product._id} className="p-2 cursor-pointer border">
              <img src={product.ProductImage} alt={product.ProductTitle} className="w-10 h-10 object-cover rounded-full" />
              <p className="text-gray-700 font-semibold">{product.ProductTitle}</p>
              <p className="text-gray-500">{product.ProductShortDescription}</p>
              <p className="text-green-500 font-bold">₹{product.ProductPrice}</p>
            </div>
           
           
          ))}
        </div>
      )}
        </div>

        {/* Icons & Theme Toggle */}
        <div className="flex relative items-center gap-4 md:gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="text-xl lg:-ml-3 lg:absolute cursor-pointer"
              >
                <Link href="/order-status">
                  <MdOutlineEditLocation />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Order Status</p>
              </TooltipContent>
            </Tooltip>
            {user ? (
              <Link href="/Account/profile">
                <FaUserPlus className="text-xl lg:hidden block cursor-pointer" />
              </Link>
            ) : (
              <Link href="/Account/Signup">
                <FaUserPlus className="text-xl lg:hidden block cursor-pointer" />
              </Link>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <FaUserPlus
                  className="text-xl hidden lg:block cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </TooltipTrigger>
              <TooltipContent>
                {user ? (
                  <div>
                    <p>Welcome {user.firstname}</p>
                    <Link href="/Account/profile">
                      <p className="hover:text-amber-700">Dashboard</p>
                    </Link>
                    <div
                      onClick={logouthandler}
                      className="cursor-pointer hover:text-amber-700"
                    >
                      Logout
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>Create an Account</p>
                    <Link href="/Account/Signup">
                      <p className="hover:text-amber-700">Signup</p>
                    </Link>
                    <Link href="/Account/Login">
                      <p className="hover:text-amber-700">Login</p>
                    </Link>
                  </div>
                )}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/add-cart">
                  <FaCartArrowDown className="text-xl cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Theme Toggle */}
          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer mr-4 border-2 border-gray-900 rounded-2xl p-1 w-8 flex items-center justify-center"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenuDemo />
    </div>
  );
}



 

 


 


 
 