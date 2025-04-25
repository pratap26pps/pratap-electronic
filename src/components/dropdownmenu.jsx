"use client";
import React, { useState, useEffect,useRef } from "react";
import Link from "next/link";
import { RiArrowDropRightFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { FaBars, FaTimes } from "react-icons/fa"; 
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import toast from "react-hot-toast";
 
 


export function NavigationMenuDemo() {

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [components, setcomponents] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [brandname, setbrandname] = useState([]);
  const router = useRouter()

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const categoryhandler = async () => {
    setLoading(true)
    try{
      const response = await axios.get('/api/TotalProduct');
      console.log("responseof category",response.data.data);
      setcomponents(response.data.data);
    }catch(error){
     toast.error("error.message")
    }finally{
      setLoading(false)
    }

  }
    useEffect(()=>{
      categoryhandler();
    },[])

    const brandhandler = async () => {
      const response = await axios.get('/api/TopManufacturing');
      console.log("response of  brand",response.data );
      setbrandname(response.data)
    }
      useEffect(()=>{
        brandhandler();
      },[]) 

  // for search box

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product"); // Change to your actual API endpoint
        const data = await response.json();
        console.log("data heee", data);
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
    <NavigationMenu className="mt-6">
      {/* Hamburger Menu Button */}
      <div className="flex justify-between items-center md:hidden">
        {/* <h1 className="text-lg font-bold">Menu</h1> */}
        <button
          className="text-xl p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
        <div className="md:hidden px-4 mt-2">
           <div   ref={searchContainerRef}
                  className="items-center gap-2 p-2 w-full border rounded-full bg-gray-100 shadow-sm focus-within:shadow-md transition-shadow duration-300">
                  <div className="flex">
                 <FaSearch className="text-gray-500 ml-4 mt-1" />
                   <input
                     value={searchTerm}
                     onChange={handleSearchChange}
                     type="search"
                     placeholder="Search for product..."
                     className="w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2"
                   />
                  </div>

                   {filteredProducts.length > 0 && (
                    <div className="absolute left-7  z-50 mt-3 gap-1 bg-gray-500 w-[95%]">
                     <div  className="flex text-2xl  justify-center border-b-4  p-2">
                         Products
                       </div>
                     <div className=" border rounded shadow-md p-2">
             
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
        </div>
      </div>
      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-neutral-950 shadow-lg p-4 transition-all duration-300 lg:hidden block">

          <NavigationMenuList className="w-full">

            <div className="flex flex-col ">
              <NavigationMenuItem>
                <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="h-72  relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1 z-20 md:w-[200px] lg:w-[250px] shadow-lg rounded-md">
           

                    {components.map((category, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center cursor-pointer hover:text-red-500 px-3 py-2 rounded-md"
                        onMouseEnter={() => setHoveredCategory(category.name)}
                      >
                        <ListItem title={category.name} 
                        href={category.name} 
                        />
                        <RiArrowDropRightFill className="text-xl" />
                      </div>
                    ))}
                  </ul>
                </NavigationMenuContent>

                {/* Submenu Panel */}
                {hoveredCategory && (
                  <div
                    className="absolute bg-gray-700 text-amber-50 h-[43vh] top-66 right-[0px] z-[999] border shadow-lg rounded-md w-[200px] p-3 transition-all duration-300 opacity-100 overflow-y-auto"
                    style={{
                      scrollbarGutter: "stable both-edges",
                      textAlign: "left",
                    }}
                    onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <h3 className="text-lg font-semibold border-b pb-2">
                      {hoveredCategory}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {components
                        .find((cat) => cat.name === hoveredCategory)
                        ?.subcategory.map((sub, i) => (
                          <ListItem
                            key={i}
                            href={`/${hoveredCategory}/${sub.name}`}
                            className="hover:text-blue-600 cursor-pointer"
                          >
                            {sub.name}
                          </ListItem>
                        ))}
                    </ul>
                  </div>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>TOP Manufacturers</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="w-[200px] gap-2 p-1">
                    {brandname.map((component) => (
                      <ListItem
                        key={component.name}
                        title={component.name}
                        href={component.name}
                      >
                        {/* {component.description} */}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/quick-order" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Quick Order
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/Contact-Us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </div>
      )}
      {/* navList for large screen */}
      <NavigationMenuList className="lg:block hidden">

        <div className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              {
                Loading ? <div className="loader"></div> :
                <ul className="h-72 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1 z-20 md:w-[200px] lg:w-[250px] shadow-lg rounded-md">
    
                {components.map((category, index) => (
                  <div
                    key={index}
                    className=" flex justify-between cursor-pointer hover:text-red-500   rounded-md"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                  >
                    <ListItem title={category.name} 
                    // href={category._id}
                     />
                    <RiArrowDropRightFill className="text-xl" />
                  </div>  
                ))}
              </ul>
              }
             
            </NavigationMenuContent>

            {/* Submenu Panel */}
            {hoveredCategory && (
              <div
                className="absolute bg-gray-700 text-amber-50 h-[43vh] top-12 left-[260px] border shadow-lg rounded-md w-[200px] p-3 transition-all duration-300 opacity-100 overflow-y-auto"
                style={{
                  scrollbarGutter: "stable both-edges",
                  textAlign: "left",
                }}
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <h3 className="text-lg font-semibold border-b pb-2">
                  {hoveredCategory}
                </h3>
                <ul className="mt-2 space-y-2">
                  {components.find((cat) => cat.name === hoveredCategory)
                    ?.subcategory.map((sub, i) => (
                      <ListItem
                        key={i}
                        href={`/${sub.name}/${sub._id}`}
                        className="hover:text-blue-600 cursor-pointer"
                      >
                        {sub.name}
                      </ListItem>
                    ))}
                </ul>
              </div>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>TOP Manufacturers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="h-72 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400   z-20 md:w-[200px] lg:w-[250px] shadow-lg rounded-md">
                {brandname.map((component) => (
                  <ListItem
                    key={component.name}
                    title={component.name}
                    href={component._id}
                  >
                    {/* {component.description} */}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>


          </NavigationMenuItem>
     
          <NavigationMenuItem>
            <Link href="/quick-order" legacyBehavior passHref>
             
                <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                  Quick Order
                </NavigationMenuLink>
 
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Contact-Us" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            href={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
