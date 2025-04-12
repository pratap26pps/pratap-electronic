"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { use } from "react";
import axios from "axios";

export default function Page({ params }) {
  const { subproduct } = use(params);
  const { product } = use(params);

  const [brandname, setproducts] = useState([]);
  const [specificproducts, setspecificproducts] = useState([]);
  
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCheckboxChange = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const producthandler = async () => {
    try {
      const response = await axios.get(
        `/api/brandProduct?subcategoryId=${subproduct}`
      );
      console.log("response during get brand", response.data);
      setproducts(response.data);
       
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    producthandler();
  }, []);

  const BrandProducthandler = async (brandId) => {
    try {
      const response = await axios.get(
        `/api/productbybrand?brandId=${brandId}`
      );
      console.log("response during get product", response.data);
      setspecificproducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <div>
      <div className="mt-40 flex gap-10">
        {/* stock status */}
        <div className="ml-10 w-[13%]">
          <p>Refine by</p>
          {selectedBrands.length === 0 ? (
            <p>No filters applied</p>
          ) : (
            <ul className="list-disc list-inside">
              {selectedBrands.map((id) => {
                const brand = brandname.find((b) => b._id === id);
                return <li key={id}>{brand?.name}</li>;
              })}
            </ul>
          )}

          <div>
            <p className="font-semibold">Brand</p>
            {brandname.map((brand) => {
              return (
                <div key={brand._id}>
                  {/* <Link href={`${subproduct}/${brand._id}`}> */}
                    <div onClick={()=>BrandProducthandler(brand._id)} className="flex gap-1 cursor-pointer">
              
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={selectedBrands.includes(brand._id)}
                        onChange={() => {
                          handleCheckboxChange(brand._id);
                          BrandProducthandler(brand._id);           
                        }}
                      ></input>
                      {brand.name}
                    </div>
                  {/* </Link> */}
                </div>
              );
            })}
          </div>

          <div>
            <p>Price</p>
          </div>
          <div>
            <p>Stock Status</p>
          </div>
        </div>

        {/* main content */}
        <div>
          <div className="flex">
            <Link href="/">
              <h1 className="text-orange-500 mx-2"> <u>Home</u> </h1>
            </Link>
            <h1 className="mr-2">/</h1>
            <h1>{product}/</h1>
            <h1>{subproduct}</h1>
          </div>
       {/* specific brand product  */}
       <div className="grid w-[71%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            { 
               specificproducts.map((p) => (
                <div
                  key={p._id}
                  className="border   my-2 rounded shadow-lg 
                 aspect-square items-center justify-center p-6"
                >
                  <Link href={`/checkproduct/${p._id}`}>
                  <div className="shadow shadow-neutral-300 border border-b-gray-200 flex flex-col">
                    <div className="h-56 w-44 p-4  mx-auto">
                      <img src={p.ProductImage} alt="productimage" />
                    </div>

                    <div className="text-neutral-400 ml-5 ">
                      {p.ProductTitle}
                    </div>

                    <div className="font-semibold hover:text-neutral-500 cursor-pointer ml-5">
                      {p.ProductShortDescription}
                    </div>

                    <div className="text-lg font-semibold text-red-400 ml-5 ">
                      ₹ {p.ProductPrice}
                      <span className="text-gray-500 text-sm"> ex. GST</span>
                    </div>

                    <div className=" w-full h-px p-[1/2px] bg-gray-100  mb-3 mt-4 flex mx-auto"></div>
                    <div className="font-semibold mb-2 ml-5">
                      Shipped in 24 Hours from Mumbai Warehouse
                    </div>
                    <h1 className='font-semibold text-green-600 mb-5 ml-5'>{p.productItems}in Stock</h1>
                  </div>
                  </Link>
            
                  <div className="flex flex-col gap-2 p-4">
                    <button className="bg-orange-400 p-2 rounded-lg focus:outline-none hover:bg-orange-300 shadow-md font-semibold text-white cursor-pointer ">
                      ADD TO Cart
                    </button>

                    <button className="border-2 p-2 font-semibold shadow rounded-lg focus:outline-none  hover:text-orange-300 cursor-pointer hover:border-orange-300">
                      ADD TO wishlist
                    </button>
                  </div>
                </div>
              ))
            }
          </div>

     {/* all brand product */}
          <div className="grid w-[71%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {brandname.map((brand) =>
              brand.product.map((p) => (
                <div
                  key={p._id}
                  className="border   my-2 rounded shadow-lg 
                 aspect-square items-center justify-center p-6"
                >
                <Link href={`/checkproduct/${p._id}`}>
                  <div className="shadow shadow-neutral-300 border border-b-gray-200 flex flex-col">
                    <div className="h-56 w-44 p-4  mx-auto">
                      <img src={p.ProductImage} alt="productimage" />
                    </div>

                    <div className="text-neutral-400 ml-5 ">
                      {p.ProductTitle}
                    </div>

                    <div className="font-semibold hover:text-neutral-500 cursor-pointer ml-5">
                      {p.ProductShortDescription}
                    </div>

                    <div className="text-lg font-semibold text-red-400 ml-5 ">
                      ₹ {p.ProductPrice}
                      <span className="text-gray-500 text-sm"> ex. GST</span>
                    </div>

                    <div className=" w-full h-px p-[1/2px] bg-gray-100  mb-3 mt-4 flex mx-auto"></div>
                    <div className="font-semibold mb-2 ml-5">
                      Shipped in 24 Hours from Mumbai Warehouse
                    </div>
                    <h1 className='font-semibold text-green-600 mb-5 ml-5'>{p.productItems}in Stock</h1>
                  </div>
                  </Link>
                  <div className="flex flex-col gap-2 p-4">
                    <button className="bg-orange-400 p-2 rounded-lg focus:outline-none hover:bg-orange-300 shadow-md font-semibold text-white cursor-pointer ">
                      ADD TO Cart
                    </button>

                    <button className="border-2 p-2 font-semibold shadow rounded-lg focus:outline-none  hover:text-orange-300 cursor-pointer hover:border-orange-300">
                      ADD TO wishlist
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>


        {/* cart review */}

 <div className="fixed left-[76%]  shadow-xl rounded-2xl p-6 w-72 hidden sm:block border border-gray-200">
  <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>

  <div className="space-y-3 text-sm text-gray-700">
    <p className="text-center text-gray-500 italic">Your cart is empty</p>

    <div className="flex justify-between">
      <span>Total items</span>
      <span className="font-semibold">0</span>
    </div>

    <div className="flex justify-between">
      <span>Subtotal:</span>
      <span className="font-medium">₹ 0.00</span>
    </div>

    <div className="flex justify-between">
      <span>Shipping:</span>
      <span className="font-medium">₹ 0.00</span>
    </div>

    <div className="flex justify-between text-lg font-bold text-green-600">
      <span>Grand Total:</span>
      <span>₹ 0.00</span>
    </div>
  </div>

  <div className="mt-6 space-y-2">
    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition">
      View Cart
    </button>
    <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
      BuyNow
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
