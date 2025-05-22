"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
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
  const [loading2, setloading2] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [brandname, setBrandname] = useState([]);
  const router = useRouter();
  const user = useSelector((state) => state.auth.signupdata);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setloading2(true);
      try {
        const categoryResponse = await axios.get("/api/TotalProduct");
        setComponents(categoryResponse.data.data);

        if (categoryResponse) {
          const brandResponse = await axios.get("/api/TopManufacturing");
          setBrandname(brandResponse.data);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
        setloading2(false);
      }
    };

    fetchData();
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

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/TopManufacturing/${id}`);
      toast.success("Brand deleted successfully");
      setBrandname((prev) => prev.filter((brand) => brand._id !== id));
    } catch (error) {
      toast.error("Delete failed", error);
    } finally {
      setDeletingId(null);
    }
  };
    const handleDelete2 = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/subCategory/${id}`);
      toast.success("subCategory deleted successfully");
         setComponents((prev) =>
      prev.map((category) => ({
        ...category,
        subcategory: category.subcategory?.filter((sub) => sub._id !== id),
      }))
    );
    } catch (error) {
      toast.error("Delete failed", error);
    } finally {
      setDeletingId(null);
    }
  };
      const handleDelete3 = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/category/${id}`);
      toast.success("Category deleted successfully");
      setComponents((prev) => prev.filter((sub) => sub._id !== id));
    } catch (error) {
      toast.error("Delete failed", error);
    } finally {
      setDeletingId(null);
    }
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
            loading2={loading2}
            handleDelete={handleDelete}
            handleDelete2={handleDelete2}
            handleDelete3={handleDelete3}
            user={user}
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
            deletingId={deletingId}
            handleDelete={handleDelete}
            handleDelete2={handleDelete2}
            handleDelete3={handleDelete3}
            user={user}
          />
        </div>
      )}
    </div>
  );
}

// Separate dropdowns into a subcomponent
function Dropdowns({
  components,
  brandname,
  loading,
  loading2,
  deletingId,
  handleDelete,
  handleDelete2,
  handleDelete3,
  user,
}) {
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
                  <div className="cursor-pointer">{category.name}</div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    asChild
                    className="px-2 py-1 font-semibold text-gray-700 dark:text-gray-200"
                  >
                    <div className="w-full flex justify-between items-center gap-4">
                      <Link
                        href={`/Totalproduct/${category._id}`}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </Link>
                      {user?.role === "owner" ? (
                        <button
                          onClick={() => handleDelete3(category._id)}
                          className="text-red-500 cursor-pointer hover:underline text-sm"
                          disabled={deletingId === category._id}
                        >
                          {deletingId === category._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </DropdownMenuItem>
                  {category.subcategory?.map((sub) => (
                    <DropdownMenuItem asChild key={sub._id}>
                      <div className="w-full flex justify-between items-center gap-4">
                        <Link
                          href={`/${category.name}/${sub._id}`}
                          className="cursor-pointer"
                        >
                          {sub.name}
                        </Link>
                        {user?.role === "owner" ? (
                          <button
                            onClick={() => handleDelete2(sub._id)}
                            className="text-red-500 cursor-pointer hover:underline text-sm"
                            disabled={deletingId === sub._id}
                          >
                            {deletingId === sub._id ? "Deleting..." : "Delete"}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
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
          {loading2 ? (
            <div className="p-2">Loading...</div>
          ) : (
            brandname.map((brand) => (
              <DropdownMenuItem
                asChild
                key={brand._id}
                className="flex justify-between items-center"
              >
                <div className="w-full flex justify-between items-center gap-4">
                  <Link
                    href={`/${brand._id}`}
                    className="flex-1 cursor-pointer"
                  >
                    {brand.name}
                  </Link>
                  {user?.role === "owner" ? (
                    <button
                      onClick={() => handleDelete(brand._id)}
                      className="text-red-500 cursor-pointer hover:underline text-sm"
                      disabled={deletingId === brand._id}
                    >
                      {deletingId === brand._id ? "Deleting..." : "Delete"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
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
