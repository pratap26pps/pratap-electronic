import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FaUserPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineEditLocation } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { NavigationMenuDemo } from "../dropdownmenu";
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
import { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";
import { setSignupdata, setUserdetail } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setTheme, theme } = useTheme();

  const user = useSelector((state) => state.auth.signupdata); 
  console.log("user",user) 

  const logouthandler = async () => {
    try {
      await axios.get("/api/users/logout");
      Cookies.remove("token");
     dispatch(setUserdetail(null));
     dispatch(setSignupdata(null));    
    
      router.push("/Account/Login");
      toast.success("logout Successfull")
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // for search box

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
 
    const allProducts = useSelector((state) => state.product.Productdetails || []);
  
 


  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const results = allProducts.filter((product) =>
        product.ProductTitle.toLowerCase().includes(value)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  const gotoproduct = (id) => {
    router.push(`/checkproduct/${id}`);
    setSearchTerm("");
    setFilteredProducts([]);
  };



  // Close the dropdown filtered products when user clicks outside
  const searchContainerRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setSearchTerm("");
      setFilteredProducts([]);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className="pt-4 fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-between px-4 md:px-8 ">
        {/* Logo  */}
        <div className="">
          <Link href="/">
            <div> EmbProto</div>
          </Link>
        </div>
        {/* Search Bar (Hidden on Small Screens) */}
        <div   ref={searchContainerRef}
         className="hidden md:flex items-center gap-2 p-2 w-[60%] border rounded-full bg-gray-100 shadow-sm focus-within:shadow-md transition-shadow duration-300">
          <FaSearch className="text-gray-500 ml-4" />
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="search"
            placeholder="Search for product..."
            className="w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2"
          />
          {filteredProducts.length > 0 && (
           <div className="absolute top-full z-50 -mt-16 gap-1 bg-gray-500  w-[55%]">
            <div  className="flex text-2xl  justify-center border-b-4  p-2">
                Products
              </div>
            <div className=" grid grid-cols-3 grid-rows-2  border rounded shadow-md p-2">
    
              {filteredProducts.map((product) => (
                <div
                  onClick={() => gotoproduct(product._id)}
                  key={product._id}
                  className="hover:bg-gray-800 p-2 cursor-pointer border"
                >
                  <img
                    src={product.ProductImage}
                    alt={product.ProductImage}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <p className="text-amber-50 font-semibold">
                    {product.ProductTitle}
                  </p>
                  <p className="text-gray-300">
                    {product.ProductShortDescription}
                  </p>
                  <p className="text-green-500 font-bold">
                    ₹{product.ProductPrice}
                  </p>
                </div>
              ))}

            </div>
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
              <Link href="/Account/Login">
                <FaUserPlus className="text-xl lg:hidden block cursor-pointer" />
              </Link>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/add-cart">
                  <FaCartArrowDown className="text-xl cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>My Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <FaUserPlus
                  className="text-xl hidden lg:block cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user ? (
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <p>Welcome {user?.name}</p>
                    <Link href="/Account/profile">
                      <p className="px-6 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition duration-300 cursor-pointer shadow-md w-full text-center">Dashboard</p>
                    </Link>
                    <div
                      onClick={logouthandler}
                     className="px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition duration-300 cursor-pointer shadow-md w-full text-center"
                    >
                      Logout
                    </div>
                  </div>
                  
                ) : (
                  <div className="flex flex-col items-center gap-2 mt-4">
                  <Link href="/Account/Signup" passHref>
                    <p  className="px-6 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition duration-300 cursor-pointer shadow-md w-full text-center">
                      Signup
                    </p>
                  </Link>
                  <Link href="/Account/Login" passHref>
                    <p className="px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition duration-300 cursor-pointer shadow-md w-full text-center">
                      Login
                    </p>
                  </Link>
                </div>
                
                )}
              </DropdownMenuContent>
            </DropdownMenu>

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
