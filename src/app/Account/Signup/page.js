"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSignupdata, setreceivedOtp } from "@/redux/slices/userSlice";
import dynamic from "next/dynamic";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import toast from "react-hot-toast";
import Footer from "@/components/Footer";

const LottiePlayer = dynamic(() => import("@lottiefiles/lottie-player"), {
  ssr: false,
});

export default function SignupFormDemo() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    phonenumber: "",
    state: "",
    country: "",
    city: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, password: value });

    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);

    if (!isValid) {
      setPasswordError(
        "Password must be at least 8 characters and include letters and numbers."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (user.password !== user.confirmpassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(user.phonenumber)) {
      toast.error("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    dispatch(setSignupdata(user));

    try {
      const response = await axios.post("/api/users/sendotp", {
        email: user.email,
      });

      const otp = response.data.otp;
      dispatch(setreceivedOtp(otp));
      toast.success("OTP sent to your email!");
      router.push("/OtpPage");
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row">
      <div>
        <lottie-player
          className="mt-40 scale-110"
          src="/signup.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      <div className="shadow-input mt-36 mx-auto w-[61%] rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to EmbProto
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to EmbProto if you can because we don&apos;t have a login flow
          yet
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                type="text"
                value={user.firstname}
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                required
              />
            </LabelInputContainer>
          </div>

          {/* EMAIL */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </LabelInputContainer>

          {/* PASSWORD */}
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
            <div className="flex justify-between">

              <Label htmlFor="password">Password</Label>
              <span
                className="text-white mr-4 cursor-pointer"
                onClick={() => setshowpassword((prev) => !prev)}
              >
                {showpassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span></div>
              <Input
                id="password"
                type={showpassword ? "text" : "password"}
                value={user.password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <div className="flex justify-between"> 
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <span
                className="text-white mr-4 cursor-pointer"
                onClick={() => setshowconfirmpassword((prev) => !prev)}
              >
                {showconfirmpassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </span></div>
              <Input
                id="confirmpassword"
                type={showconfirmpassword ? "text" : "password"}
                value={user.confirmpassword}
                onChange={(e) =>
                  setUser({ ...user, confirmpassword: e.target.value })
                }
                required
              />
            </LabelInputContainer>
          </div>

          {/* PHONE & COUNTRY */}
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="phonenumber">Phone No</Label>
              <div className="flex">
                <Input
                  disabled
                  value="+91"
                  className="w-16 bg-gray-100 border border-gray-300 rounded-md text-center"
                />
                <Input
                  id="phonenumber"
                  type="number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={user.phonenumber}
                  onChange={(e) =>
                    setUser({ ...user, phonenumber: e.target.value })
                  }
                  required
                />
              </div>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            </LabelInputContainer>
          </div>

          {/* STATE & CITY */}
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              />
            </LabelInputContainer>
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* SUBMIT */}
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            {loading ? "Signing up..." : "Sign up →"}
            <BottomGradient />
          </button>

          {/* FOOTER LINKS */}
          <div className="flex mt-3">
            <p>Already have an account?</p>
            <Link href="/Account/Login" className="ml-3 text-blue-600">
              Login
            </Link>
          </div>
          <Link
            href="/"
            className="mt-3 flex gap-1 border w-16 rounded-full p-2"
          >
            <FaLongArrowAltLeft className="mt-1" /> Back
          </Link>
        </form>
      </div>
    </div>
    <Footer/>
    </>

  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
