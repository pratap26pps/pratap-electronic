"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { setAddCart, setRemoveCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { addToWishlist } from "@/redux/slices/wishlist";

export default function Page({ params }) {
  const { product } = use(params);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.signupdata || null);
  const [specificproducts, setspecificproducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [Loading, setLoading] = useState(false);
  const [coupon, setcoupon] = useState("");
  const cart = useSelector((state) => state.cart.cart || []);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const BrandProducthandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/productbybrand?brandId=${product}`
      );
      console.log(
        "response during get product of specific brand",
        response.data
      );
      setspecificproducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (product) {
      BrandProducthandler();
    }
  }, [product]);

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

  const gotocart = async (productId) => {
    if (user?.role === "owner") {
      toast.error("you cannot add items,you are an owner");
      return;
    }
    try {
      const res = await axios.get("/api/cart", { withCredentials: true });
      let cartItems = res.data.items || [];

      const productToToggle = specificproducts.find((p) => p._id === productId);
      if (!productToToggle) return;

      const alreadyInCart = cartItems.some(
        (item) => item.productId._id === productId
      );

      if (!alreadyInCart) {
        cartItems.push({
          productId: productToToggle._id,
          price: productToToggle.ProductPrice,
        });

        await axios.put("/api/cart", { items: cartItems });
        dispatch(setAddCart(productToToggle));
      } else {
        const updatedItems = cartItems.filter(
          (item) => item.productId._id !== productId
        );

        await axios.put("/api/cart", { items: updatedItems });
        dispatch(setRemoveCart(productToToggle._id));
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
      const response = await axios.post("/api/wishlist", {
        userId: user.id,
        productId: id,
      });

      if (response) {
        dispatch(addToWishlist(response.data));
        toast.success("Added to the wishlist");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const applyFilters = (products) => {
    return products.filter((product) => {
      const inStockCondition = inStockOnly ? product.productItems : true;
      const priceCondition =
        (!minPrice || product.ProductPrice >= parseFloat(minPrice)) &&
        (!maxPrice || product.ProductPrice <= parseFloat(maxPrice));
      return inStockCondition && priceCondition;
    });
  };

  const items = cart.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = 50;
  const gstRate = 0.18;

  const subtotal = cart.reduce(
    (acc, item) => acc + item?.ProductPrice * item.quantity,
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
      <div className="mt-40 flex lg:flex-row flex-col gap-4">
        {/* Sidebar filters */}
        <div className="ml-10 p-4  mb-10 lg:mb-0 h-20 rounded-2xl shadow-md w-64 border border-gray-200">
          <p className="text-lg font-semibold text-gray-700 mb-1">Refine by</p>
          <p className="text-sm text-gray-400 mb-4">No filters applied</p>

          {/* Price Filter Section */}
          <div className="mb-6">
            <p className="font-semibold text-base mb-2">Price</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-20 px-2 py-1 border rounded"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Max"
                className="w-20 px-2 py-1 border rounded"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-gray-500 text-right mt-1">
              Up to ₹{maxPrice}
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

        {/* Main product content */}
        <div>
          {Loading ? (
            <span className="loader ml-40 mt-36"></span>
          ) : (
            <div className="grid mt-32 lg:-mt-9 lg:w-[91%] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {specificproducts.length === 0 && (
                <div className="text-center text-gray-500 text-lg">
                  No products found for this brand.
                </div>
              )}

              {applyFilters(specificproducts).map((p) => (
                <div
                  key={p._id}
                  className="border rounded-2xl shadow-lg flex flex-col justify-between p-3" // fixed card height
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
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={() => gotocart(p._id)}
                      className="bg-orange-400 hover:bg-orange-300 text-white font-semibold py-2 rounded-lg transition shadow-md"
                    >
                      {cartItems[p._id] ? "Remove from Cart" : "Add To Cart"}
                    </button>

                    <button
                      onClick={() => wishhandler(p._id)}
                      className="border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-400 font-semibold py-2 rounded-lg transition shadow-md"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Review Sidebar */}
        <div className="lg:fixed z-20 mb-3 lg:mb-0  lg:left-[76%] lg:ml-0 ml-12 shadow-xl rounded-2xl p-6 w-72 border border-gray-200">
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
                      key={item._id}
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
                      <span> {item.quantity}</span>
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
                className="w-full mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                BuyNow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden block">
        <Footer />
      </div>
    </div>
  );
}
