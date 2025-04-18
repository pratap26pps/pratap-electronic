"use client";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchUser = async () => {
    setloading(true)
    try {
      const res = await fetch("/api/users/me", { cache: "no-store" });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    setloading(false)

    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    setloading(false)

    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/Account/Login");
      router.refresh();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const dashboardList = [
    { id: 1, name: "Orders", link: "/Account/profile/order" },
    { id: 2, name: "Returns", link: "/returns" },
    { id: 3, name: "Messages", link: "/Contact-Us" },
    { id: 4, name: "Addresses", link: "/Account/profile/AddresesManagement" },
    { id: 5, name: "Your List", link: "/yourlist" },
    { id: 6, name: "Account Settings", link: "/Account/profile/profileUpdateForm" },
  ];

  return (
    <div className="min-h-screen pt-36 px-6">
      {
        loading ? <span class="loader ml-[50%] mt-36"></span>:
        <div className="max-w-6xl mt-8 mx-auto shadow-lg rounded-3xl p-10">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome {user?.firstname} {user?.lastname}
        </h1>

        {user?.role === "owner" ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Owner Dashboard</h2>
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

        <div className="mt-10 text-right">
          <Button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            Logout
          </Button>
        </div>
      </div>
      }
     
    </div>
  );
};

export default Page;
