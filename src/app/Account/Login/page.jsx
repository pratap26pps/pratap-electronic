"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Footer from "@/components/Footer";

export default function SignupFormDemo() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // 👈 include credentials for cookie auth
      });
      router.push("/Account/profile");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:flex flex-col-reverse lg:flex-row">
        <div className="shadow-input mt-36 mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to EMBPROTO
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Login to EMBPROTO if you can because we don&apos;t have a login flow
            yet
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="yourmail@gmail.com"
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <span
                  className="text-white mr-4 cursor-pointer"
                  onClick={() => setshowpassword((prev) => !prev)}
                >
                  {showpassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
              <Input
                id="password"
                placeholder="••••••••"
                type={showpassword ? "text" : "password"}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                required
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              {loading ? (
                <div className="loader scale-50"></div>
              ) : (
                <div>
                  Login &rarr;
                  <BottomGradient />
                </div>
              )}
            </button>

            <Link
              href="/Account/forgotpassword"
              className="mt-3 cursor-pointer hover:text-amber-400"
            >
              Forgot Password
            </Link>
            <div className="flex">
              <p>Not An Account ?</p>
              <Link
                href="/Account/Signup"
                className="ml-3 hover:text-amber-400"
              >
                SignUp
              </Link>
            </div>
            <Link
              href="/"
              className="mt-3 flex gap-1 border w-16 rounded-full p-2"
            >
              <FaLongArrowAltLeft className="mt-1" /> Back
            </Link>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          </form>
        </div>
        <div>
          <lottie-player
            className="mt-36 "
            src="https://assets10.lottiefiles.com/packages/lf20_1pxqjqps.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <Footer />
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
