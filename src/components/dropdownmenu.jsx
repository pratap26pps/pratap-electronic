"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export function NavigationMenuDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandname, setBrandname] = useState([]);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/TotalProduct");
        setComponents(response.data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/api/TopManufacturing");
        setBrandname(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const goToProduct = (id) => {
    router.push(`/checkproduct/${id}`);
    setSearchTerm("");
    setFilteredProducts([]);
  };

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-4">
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden md:flex gap-6">
          <Dropdowns
            components={components}
            brandname={brandname}
            loading={loading}
          />
        </div>

        {/* Search box */}
        <div className="relative mr-11 block lg:hidden md:hidden">
          <div
            ref={searchContainerRef}
            className="flex items-center gap-2 p-2 w-80 border rounded-full bg-gray-100"
          >
            <FaSearch className="text-gray-500 ml-2" />
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2"
            />
          </div>

          {filteredProducts.length > 0 && (
            <div className="absolute mt-2 w-80 bg-white shadow-md rounded-md overflow-hidden z-10">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => goToProduct(product._id)}
                  className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <img
                    src={product.ProductImage}
                    alt={product.ProductTitle}
                    className="w-10 h-10 object-cover rounded-full mr-2"
                  />
                  <div>
                    <p className="font-semibold">{product.ProductTitle}</p>
                    <p className="text-gray-500 text-sm">
                      {product.ProductShortDescription}
                    </p>
                    <p className="text-green-500 font-bold">
                      ₹{product.ProductPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Dropdowns
            components={components}
            brandname={brandname}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

// Separate dropdowns into a subcomponent
function Dropdowns({ components, brandname, loading }) {
  return (
    <div className="flex flex-col mt-1 md:flex-row gap-4">
      {/* All Categories Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="font-bold">
          <div className="flex gap-1 cursor-pointer">
            {" "}
            All Categories <RiArrowDropDownFill className="mt-1" />{" "}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {loading ? (
            <div className="p-2">Loading...</div>
          ) : (
            components.map((category) => (
              <DropdownMenuSub key={category._id}>
                <DropdownMenuSubTrigger>
                  <div  className="cursor-pointer">
                    {category.name}
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild className="px-2 py-1 font-semibold text-gray-700 dark:text-gray-200">
                  <Link
                    href={`/Totalproduct/${category._id}`}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Link>
                  </DropdownMenuItem>
                  {category.subcategory?.map((sub) => (
                    <DropdownMenuItem asChild key={sub._id}>
                      <Link
                        href={`/${category.name}/${sub._id}`}
                        className="cursor-pointer"
                      >
                        {sub.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Top Manufacturers Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="font-bold">
          <div className="flex gap-1 cursor-pointer">
            {" "}
            Top Manufacturers <RiArrowDropDownFill className="mt-1" />{" "}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {brandname.map((brand) => (
            <DropdownMenuItem asChild key={brand._id}>
              <Link href={`/brand/${brand._id}`} className="cursor-pointer">
                {brand.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Static Pages */}
      <Link href="/quick-order" className="font-bold cursor-pointer">
        Quick Order
      </Link>
      <Link href="/Contact-Us" className="font-bold cursor-pointer">
        Contact Us
      </Link>
    </div>
  );
}
