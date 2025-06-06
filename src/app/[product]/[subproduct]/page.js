"use client";
import Link from "next/link";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { use } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { addToWishlist } from "@/redux/slices/wishlist";
import { Range } from "react-range";
const MIN = 0;
const MAX = 10000;

export default function Page({ params }) {

 const { product, subproduct } = use(params);

  const decodedProduct = decodeURIComponent(product);
  const decodedSubproduct = decodeURIComponent(subproduct);
  console.log("decodedProduct", decodedProduct);
  console.log("decodedSubproduct", decodedSubproduct);

  const dispatch = useDispatch();
  const router = useRouter();
  const [brandname, setproducts] = useState([]);
  const [specificproducts, setspecificproducts] = useState([]);
  const cart = useSelector((state) => state.cart.cart || []);
  console.log("product in subproduct cart", cart);
  const user = useSelector((state) => state.auth.signupdata || null);

  const [cartItems, setCartItems] = useState({});
  const [loading, setloading] = useState(false);
  const [loading1, setloading1] = useState(false);
  const [coupon, setcoupon] = useState("");

  const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [inStockOnly, setInStockOnly] = useState(false);
 const [values, setValues] = useState([0, 10000]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const handleCheckboxChange = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const producthandler = async () => {
    setloading1(true);
    try {
      const response = await axios.get(
        `/api/brandProduct?subcategoryId=${decodedSubproduct}`
      );
      console.log("response during get brand", response.data);
      setproducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setloading1(false);
  };
  useEffect(() => {
    producthandler();
  }, []);

  const BrandProducthandler = async (brandId) => {
    setloading(true);
    try {
      const response = await axios.get(
        `/api/productbybrand?brandId=${brandId}`
      );
      console.log("response during get product", response.data);
      setspecificproducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setloading(false);
  };

  // check state of add to cart
     useEffect(() => {
       const fetchCart = async () => {
         try {
           const res = await axios.get("/api/cart", { withCredentials: true });
           const items = res.data.items || [];
     
           const cartMap = {};
           for (const item of items) {
             cartMap[item.productId._id] = true;
           }
     
           setCartItems(cartMap);
         } catch (error) {
           console.error("Error fetching cart items:", error);
         }
       };
     
       fetchCart();
     }, []);

  const applyFilters = (products) => {
  return products.filter((product) => {
    const inStockCondition = inStockOnly ? product.productItems : true;
    const priceCondition =
      (!minPrice || product.ProductPrice >= parseFloat(minPrice)) &&
      (!maxPrice || product.ProductPrice <= parseFloat(maxPrice));
    return inStockCondition && priceCondition;
  });
};



  const gotocart = async (productId) => {
    if (user?.role === "owner") {
      toast.error("you cannot add items,you are an owner");
      return;
    }
    try {
      const res = await axios.get("/api/cart", { withCredentials: true });
      let cartItems = res.data.items || [];

      // Find the product from either specificproducts or brandname (flattened)
      const allProducts = [
        ...specificproducts,
        ...brandname.flatMap((brand) => brand.product),
      ];
      const product = allProducts.find((p) => p._id === productId);
      if (!product) return;

      const alreadyInCart = cartItems.some(
        (item) => item.productId._id === productId
      );

      if (!alreadyInCart) {
        cartItems.push({
          productId: product._id,
          price: product.ProductPrice,
        });

        await axios.put("/api/cart", { items: cartItems });
        dispatch(setAddCart(product));
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.productId._id !== productId
        );

        await axios.put("/api/cart", { items: updatedItems });
        dispatch(setRemoveCart(product._id));
      }

      setCartItems((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));
    } catch (error) {
      toast.error("You must be logged in to perform this action");

      console.error("Cart operation failed:", error);
    }
  };

   const wishhandler = async (id) => {
      if (!user?.id || !id) {
        toast.error("User or product missing");
        return;
      }
    
      try {
        const response = await axios.post('/api/wishlist', {
          userId: user.id,
          productId:id,
        });
    
        if (response) {
          dispatch(addToWishlist(response.data));
          toast.success("Added to the wishlist");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
  
      }
    };

  const items = cart.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = 50;
  const gstRate = 0.18;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.ProductPrice * item.quantity,
    0
  );

  const gst = subtotal * gstRate;
  const discount = coupon === "PPS10" ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shipping + gst - discount;

  const paymenthandler = () => {
    const orderData = {
      cartItems: cart,
      coupon,
      shipping,
      gstRate,
      subtotal,
      discount,
      grandTotal,
    };

    // You can use localStorage or query params
    localStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/PlaceOrder");
  };

  return (
    <div>
      <div className="mt-36 flex lg:flex-row flex-col gap-10">
        {/* stock status */}
        <div className="ml-10 lg:w-[17%] 
        grid  lg:grid-cols-1 grid-cols-2 lg:h-44 
         rounded-2xl shadow-md text-sm text-gray-700">

       {/* refine filter */}
          <div>
            <p className="text-lg font-semibold mb-1">Refine by</p>
            {selectedBrands.length === 0 ? (
              <p className="text-gray-400">No filters applied</p>
            ) : (
              <ul className="list-disc list-inside text-orange-500">
                {selectedBrands.map((id) => {
                  const brand = brandname.find((b) => b._id === id);
                  return <li key={id}>{brand?.name}</li>;
                })}
              </ul>
            )}
          </div>
       {/* brand filter */}
          <div>
            <p className="font-semibold text-base mb-2">Brand</p>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2">
              {brandname.map((brand) => (
                <div key={brand._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-orange-400 cursor-pointer"
                    checked={selectedBrands.includes(brand._id)}
                    onChange={() => {
                      handleCheckboxChange(brand._id);
                      BrandProducthandler(brand._id);
                    }}
                  />
                  <label
                    onClick={() => BrandProducthandler(brand._id)}
                    className="cursor-pointer hover:text-orange-400 transition"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
     {/* Price Filter Section */}
            <div className="mb-6">
              <p className="font-semibold text-base mb-2">Price</p>
              <div className="flex items-center gap-2 mb-7">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-20 px-2 py-1 border rounded"
                  value={values[0]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const newVals = [Math.min(val, values[1]), values[1]];
                    setValues(newVals);
                    setMinPrice(newVals[0]);
                  }}
                />
                <span>–</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-20 px-2 py-1 border rounded"
                  value={values[1]}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const newVals = [values[0], Math.max(val, values[0])];
                    setValues(newVals);
                    setMaxPrice(newVals[1]);
                  }}
                />
              </div>
  
              {/* Range Slider */}
              <Range
                step={100}
                min={MIN}
                max={MAX}
                values={values}
                onChange={(vals) => {
                  setValues(vals);
                  setMinPrice(vals[0]);
                  setMaxPrice(vals[1]);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 w-full rounded-lg bg-gray-300"
                    style={{
                      ...props.style,
                      background: `linear-gradient(to right, #ccc ${
                        ((values[0] - MIN) / (MAX - MIN)) * 100
                      }%, #6366f1 ${
                        ((values[0] - MIN) / (MAX - MIN)) * 100
                      }% , #6366f1 ${
                        ((values[1] - MIN) / (MAX - MIN)) * 100
                      }%, #ccc ${((values[1] - MIN) / (MAX - MIN)) * 100}%)`,
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-5 w-5 rounded-full bg-blue-500 border-2 border-white shadow-md"
                  />
                )}
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹{values[0]}</span>
                <span>₹{values[1]}</span>
              </div>
            </div>

{/* Stock Status Filter Section */}
<div>
  <p className="font-semibold text-base mb-2">Stock Status</p>
  <label className="flex items-center gap-2 text-gray-700">
    <input
      type="checkbox"
      checked={inStockOnly}
      onChange={(e) => setInStockOnly(e.target.checked)}
    />
    Show only in-stock products
  </label>
</div>


        </div>



        {/* main content */}
        <div>
          
          {/* specific brand product  */}
          {loading1 ? (
            <span className="loader ml-[50%] mt-36"></span>
          ) : (
            <div className="grid lg:w-[91%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {applyFilters(specificproducts).map((p) => (
                <div
                  key={p._id}
                  className="border rounded-2xl shadow-lg flex flex-col justify-between p-4" // fixed card height
                >
                  <Link href={`/checkproduct/${p._id}`}>
                    <div className="flex flex-col items-center text-center h-full">
                      {/* Image */}
                      <div className="h-44 w-44 mb-2 flex items-center justify-center overflow-hidden rounded-lg">
                        <img
                          src={p.ProductImage}
                          alt="productimage"
                          className="object-cover h-full w-full hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* Product Texts */}
                      <div className="flex flex-col items-center px-2">
                        <div className="text-neutral-400 font-medium truncate">
                          {p.ProductTitle}
                        </div>

                        <div className="font-semibold hover:text-neutral-500 cursor-pointer line-clamp-2">
                          {p.ProductShortDescription}
                        </div>

                        <div className="text-lg font-bold text-red-400">
                          ₹ {p.ProductPrice}
                          <span className="text-gray-500 text-sm">
                            {" "}
                            ex. GST
                          </span>
                        </div>

                        <div className="w-full h-px bg-gray-200 my-1"></div>

                        <div className="text-sm font-semibold text-gray-700">
                          Shipped in 24 Hours from Mumbai Warehouse
                        </div>

                        <div className="text-green-600 font-semibold text-sm">
                          {p.productItems} in Stock
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 mt-1">
                    <button
                      onClick={() => gotocart(p._id)}
                      className="bg-orange-400 hover:bg-orange-300 text-white font-semibold py-2 rounded-lg transition shadow-md"
                    >
                      {cartItems[p._id] ? "Remove from Cart" : "Add To Cart"}
                    </button>

                    <button
                       onClick={()=>wishhandler(p._id)}
                    className="border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-400 font-semibold py-2 rounded-lg transition shadow-md">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* all brand product */}

          {loading ? (
            <span className="loader ml-[50%] mt-36"></span>
          ) : (
            <div className="grid -mt-6 lg:w-[91%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
               {brandname.length === 0 && (
                <div className="text-center text-gray-500 text-lg">
                  No products found for this Category.
                </div>
              )}
              {brandname.map((brand) =>
               applyFilters(brand.product).map((p) => (
                  <div
                    key={p._id}
                    className="border rounded-2xl shadow-lg flex flex-col justify-between p-4" // fixed height for all cards
                  >
                    <Link href={`/checkproduct/${p._id}`}>
                      <div className="flex flex-col items-center text-center h-full">
                        {/* Image */}
                        <div className="h-44 w-44 mb-1 flex items-center justify-center overflow-hidden rounded-lg">
                          <img
                            src={p.ProductImage}
                            alt="productimage"
                            className="object-cover h-full w-full hover:scale-105 transition duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col items-center px-2">
                          <div className="text-neutral-400 font-medium truncate">
                            {p.ProductTitle}
                          </div>

                          <div className="font-semibold hover:text-neutral-500 cursor-pointer line-clamp-2">
                            {p.ProductShortDescription}
                          </div>

                          <div className="text-lg font-bold text-red-400">
                            ₹ {p.ProductPrice}
                            <span className="text-gray-500 text-sm">
                              {" "}
                              ex. GST
                            </span>
                          </div>

                          <div className="w-full h-px bg-gray-200 my-1"></div>

                          <div className="text-sm font-semibold text-gray-700">
                            Shipped in 24 Hours from Mumbai Warehouse
                          </div>

                          <div className="text-green-600 font-semibold text-sm">
                            {p.productItems} in Stock
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => gotocart(p._id)}
                        className="bg-orange-400 hover:bg-orange-300 text-white font-semibold py-2 rounded-lg transition shadow-md"
                      >
                        {cartItems[p._id] ? "Remove from Cart" : "Add To Cart"}
                      </button>

                      <button
                       onClick={()=>wishhandler(p._id)}
                      className="border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-400 font-semibold py-2 rounded-lg transition shadow-md">
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

     

        {/* cart review */}
        <div className="lg:fixed z-20 mb-3 lg:mb-0  lg:left-[76%] lg:ml-0 ml-12 shadow-xl rounded-2xl p-6 w-72  border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>

          <div className="space-y-3 text-sm text-gray-700">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item?._id}
                      className="flex justify-between items-center"
                    >
                      <img
                        src={item?.ProductImage}
                        height={34}
                        width={34}
                      ></img>
                      <span className="truncate w-2/3">
                        {item?.ProductTitle}
                      </span>
                      <span className="truncate w-2/3">
                        {item?.ProductPrice}
                      </span>
                      <span>{item?.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <span>Total items</span>
                  <span className="font-semibold">{items}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">₹ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">₹ {shipping}.00</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-green-600">
                  <span>Grand Total:</span>
                  <span>₹ {grandTotal}</span>
                </div>
              </>
            )}
            <div className="mt-6 space-y-2">
              <Link href="/add-cart">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition">
                  View Cart
                </button>
              </Link>

              <button
                onClick={paymenthandler}
                className="w-full mt-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                BuyNow
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden block">
      <Footer/>
      </div>
    </div>
  );
}
