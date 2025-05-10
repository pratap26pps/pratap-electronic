"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setSignupdata, setUserdetail } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Page = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [signupdata, setsignupdata] = useState(null);
  const [loading, setloading] = useState(false);

  console.log("signupdata in profile", signupdata);

  const fetchUser = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/users/me", { cache: "no-store" });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        dispatch(setSignupdata(data.user));
      } else {
        setUser(null);
      }
      setloading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // get all userdetails from get request
  const fetchUser2 = async () => {
    try {
      if (!user?.email) return;

      const userId = user.id;
      if (userId) {
        const res = await fetch(`/api/wishlist/${userId}`, {
          method: "GET",
          cache: "no-store",
        });
        const detailData = await res.json();
        console.log("detailData", detailData);
        if (detailData?.items?.length > 0) {
          const wishlistItems = detailData?.items || [];
          localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
        }
      }

      const res = await fetch(`/api/users/signup?email=${user.email}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      console.log("data in user2 hero section", data);

      if (data.user) {
        setsignupdata(data.user);
        dispatch(setUserdetail(data.user));
      }
    } catch (error) {
      console.error("Error fetching user2:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUser2();
    }
  }, [user]);

  const dashboardList = [
    { id: 1, name: "Orders", link: "/Account/profile/order" },
    { id: 2, name: "Returns", link: "/Account/profile/returns" },
    { id: 3, name: "Messages", link: "/Contact-Us" },
    { id: 4, name: "Addresses", link: "/Account/profile/AddresesManagement" },
    { id: 5, name: "Your List", link: "/Account/profile/yourlist" },
    {
      id: 6,
      name: "Account Settings",
      link: "/Account/profile/profileUpdateForm",
    },
  ];

  const logouthandler = async () => {
    try {
      await axios.get("/api/users/logout");
      Cookies.remove("token");
      dispatch(setUserdetail(null));
      dispatch(setSignupdata(null));
      router.push("/Account/Login");
      toast.success("logout Successfull");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen pt-36 px-6">
        {loading ? (
          <span className="loader ml-[50%] mt-36"></span>
        ) : (
          <div className="max-w-6xl mt-8 mx-auto shadow-lg rounded-3xl p-10">
            <Image
              alt="Profile image"
              src="/profile.png"
              height={45}
              width={45}
            />
            <h1 className="text-3xl font-semibold mb-6">
              Welcome {signupdata?.firstname} {signupdata?.lastname}
            </h1>

            {user?.role === "owner" ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Owner Dashboard
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Link href="/ShowProduct">
                    <div className="bg-blue-500 hover:bg-blue-600 text-white text-center py-4 rounded-xl shadow-md transition">
                      Show All Products
                    </div>
                  </Link>
                  <Link href="/Account/profile/ShowAllOrder">
                    <div className="bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl shadow-md transition">
                      Show All Orders
                    </div>
                  </Link>
                  <Link href="/Account/showallmessage">
                    <div className="bg-amber-700 hover:bg-amber-800 text-white text-center py-4 rounded-xl shadow-md transition">
                      Show All Message
                    </div>
                  </Link>
                  <Link href="/Account/NewsForm">
                    <div className="bg-amber-700 hover:bg-amber-800 text-white text-center py-4 rounded-xl shadow-md transition">
                      Upload News
                    </div>
                  </Link>
                  <Link href="/upload/category">
                    <div className="bg-purple-500 hover:bg-purple-600 text-white text-center py-4 rounded-xl shadow-md transition">
                      Upload Product
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
                {dashboardList.map((list) => {
                  const isActive = pathname === list.link;
                  return (
                    <Link key={list.id} href={list.link}>
                      <div
                        className={`text-center py-3 px-4 rounded-xl shadow-sm transition-all font-medium ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-blue-100"
                        }`}
                      >
                        {list.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            <Button
              onClick={() => logouthandler()}
              className="lg:ml-[90%] mt-4 cursor-pointer"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
