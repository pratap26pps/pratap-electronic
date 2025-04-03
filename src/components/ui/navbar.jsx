import React  from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes" 
import { FaUserPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineEditLocation } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { NavigationMenuDemo } from '../dropdownmenu';
import Image from 'next/image'; 
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { useRouter } from 'next/navigation';
import axios from 'axios';
 
import { useEffect, useState } from "react";

export default function  Navbar(){
    const router = useRouter()
    const { setTheme,theme } = useTheme();
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
    console.log("user",user);  

 

    const logouthandler = async()=>{
      try{
        await axios.get("/api/users/logout");
        Cookies.remove("token"); 
        setUser(null);  
        router.refresh();    
        router.push('/Account/Login');
        
       }catch(error){
         console.log(error.message);
     toast.error(error.message);
       }
    }

    const [isOpen, setIsOpen] = useState(false); //---->htis one also added


  return  (
    <div className='p-4 fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md'>
      <div className='flex justify-between px-4 md:px-8 '>
        {/* Logo  */}
        <div className=''>
          <Link href='/'>
            <div className='text-lg font-semibold cursor-pointer'>EmbProto</div>
          </Link>

          
        </div>
        {/* Search Bar (Hidden on Small Screens) */}
        <div className='hidden md:flex items-center gap-2 p-2 w-[60%] border rounded-full bg-gray-100 shadow-sm focus-within:shadow-md transition-shadow duration-300'>
            <FaSearch className='text-gray-500 ml-4' />
            <input 
              type='search' 
              placeholder='Search for product...'
              className='w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2'
            />
          </div>

        {/* Icons & Theme Toggle */}
        <div className='flex items-center gap-4 md:gap-8'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href='/order-status'>
                  <MdOutlineEditLocation className='text-xl cursor-pointer' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Order Status</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <FaUserPlus className='text-xl cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
              </TooltipTrigger>
              <TooltipContent>
                {user ? (
                  <div>
                    <p>Welcome {user.firstname}</p>
                    <Link href='/Account/profile'><p className='hover:text-amber-700'>Dashboard</p></Link>
                    <div onClick={logouthandler} className='cursor-pointer hover:text-amber-700'>Logout</div>
                  </div>
                ) : (
                  <div>
                    <p>Create an Account</p>
                    <Link href='/Account/Signup'><p className='hover:text-amber-700'>Signup</p></Link>
                    <Link href='/Account/Login'><p className='hover:text-amber-700'>Login</p></Link>
                  </div>
                )}
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href='/add-cart'>
                  <FaCartArrowDown className='text-xl cursor-pointer' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Theme Toggle */}
          <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='cursor-pointer border-2 border-gray-900 rounded-2xl p-1 w-8 flex items-center justify-center'>
            <Sun className='h-5 w-5 dark:hidden' />
            <Moon className='h-5 w-5 hidden dark:block' />
          </div>
        </div>
      
      </div>
      
     
      

      {/* Navigation Menu */}
      <NavigationMenuDemo />
    </div>
  );
}

 







//******************************OLD CODE****************************** */

// return (
//   <div className='p-4 fixed w-full -top-1 z-50 bg-white dark:bg-gray-900'>
//   <div className="flex justify-between items-center ">
//       <div className='flex gap-4'>
//         <Link href='/'>
//         <div> EmbProto
//         {/* <Image
//       src="/ep.jpg"
//       alt="Local Image"
//       width={110}
//       height={80}
//     /> */}
             
//           </div> 
//         </Link>

//           <div className='flex items-center gap-2 p-2 w-full border rounded-full bg-gray-100 shadow-sm focus-within:shadow-md transition-shadow duration-300'>
//               <FaSearch className='text-gray-500 ml-4 p-1 transform scale-200 transition-transform duration-300 ease-in-out' />
//               <input 
//                   type="search" 
//                   name="search" 
//                   id="1"
//                   placeholder='Search for product...'
//                   className='w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2'
//               />
//           </div>
          
//       </div>
// <div className='flex gap-16 cursor-pointer '>
//   <div className='scale-150  flex gap-4 cursor-pointer mt-2'>
//   <TooltipProvider>
//     <Tooltip>
//       <TooltipTrigger asChild>
//       <Link href="/order-status">
//          <MdOutlineEditLocation/> 
//          </Link>
//       </TooltipTrigger>
//       <TooltipContent>
//         <Link href="/order-status">
//         <p>order-status</p>
//         </Link>
//       </TooltipContent>
//     </Tooltip>
//     <Tooltip>
//       <TooltipTrigger asChild>
//          <FaUserPlus/> 
//       </TooltipTrigger>
//       <TooltipContent>

//      {
//       user ? (<div>
//         <p>Welcome {user?.firstname}</p>
//         <Link href='/Account/profile'>
//           <p className='text-xl mt-1  hover:text-amber-700'>Dashboard</p>
//         </Link>
      
//        <div onClick={logouthandler} className='text-xl mt-1 cursor-pointer  hover:text-amber-700'>Logout</div>
         
//       </div>):
//       (<div>
//         <p>create an Account</p>
//         <Link href='/Account/Signup'>
//           <p className='text-xl mt-1  hover:text-amber-700'>Signup</p>
//         </Link>
//         <Link href='/Account/Login'>
//           <p className='text-xl mt-1  hover:text-amber-700'>Login</p>
//         </Link>
//       </div>)
//      }  

//       </TooltipContent>
//     </Tooltip>
//     <Tooltip>
//       <Link href="/add-cart">
//       <TooltipTrigger asChild>
//         <FaCartArrowDown/> 
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>add to cart</p>
//       </TooltipContent>
//       </Link>
//     </Tooltip>
//   </TooltipProvider>
//   </div>
//       {/* themebutton */}
//       <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
//       <div variant="outline" size="icon" className="p-1 cursor-pointer border-2 border-b-gray-900 rounded-2xl w-8">
//         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//         <Moon className="absolute -mt-4.5 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       </div>
//     </div>
// </div>
   
//   </div>
//   <NavigationMenuDemo/>
//   </div>

// )
// }
